<script setup lang="ts">
import type { Stroke, Point, Sign } from "#shared/types/canvas";

const client = useSupabaseClient();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

const sessionId = Math.random().toString(36).substring(7);

const {
  scale,
  offset,
  tool,
  isInteracting,
  strokes,
  currentStroke,
  remoteStrokes,
  handleStart,
  handleMove: originalHandleMove,
  handleEnd: originalHandleEnd,
  zoom,
  resetView
} = useCanvas(canvasRef, containerRef);

const channel = client.channel("canvas_signs", {
  config: { broadcast: { self: false } }
});

const saveSignature = async (stroke: Stroke) => {
  try {
    const { error } = await client.from("canvas").insert({
      sign: stroke as Sign
    });
    if (error) throw error;
  } catch (err) {
    console.error("Error saving signature:", err);
  }
};

const emitStroke = (points: Point[]) => {
  channel.send({
    type: "broadcast",
    event: "stroke",
    payload: {
      points,
      lightColor: "#202020",
      darkColor: "#ffffff",
      sessionId
    }
  });
};

const emitStrokeEnd = () => {
  channel.send({
    type: "broadcast",
    event: "stroke-end",
    payload: { sessionId }
  });
};

const handleMove = (e: MouseEvent | TouchEvent) => {
  originalHandleMove(e);
  if (isInteracting.value && tool.value === "pencil") {
    emitStroke(currentStroke.value);
  }
};

const handleEnd = () => {
  const beforeLen = strokes.value.length;
  originalHandleEnd();
  const afterLen = strokes.value.length;

  if (afterLen > beforeLen) {
    const newStroke = strokes.value[afterLen - 1];

    saveSignature(newStroke as Stroke);
  }

  if (tool.value === "pencil") {
    emitStrokeEnd();
  }
};

onMounted(async () => {
  const { data } = await client.from("canvas").select("sign");
  if (data) {
    strokes.value = data.map((d) => d.sign as Stroke);
  }

  channel
    .on("broadcast", { event: "stroke" }, ({ payload }) => {
      remoteStrokes.value[payload.sessionId as string] = {
        points: payload.points as Point[],
        lightColor: payload.lightColor as string,
        darkColor: payload.darkColor as string
      };
    })
    .on("broadcast", { event: "stroke-end" }, ({ payload }) => {
      const { [payload.sessionId as string]: _, ...rest } = remoteStrokes.value;
      remoteStrokes.value = rest;
    })
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "canvas" }, (payload) => {
      const newSign = payload.new.sign as unknown as Stroke;

      const alreadyExists = strokes.value.some(
        (s: Stroke) => JSON.stringify(s.points) === JSON.stringify(newSign.points)
      );

      if (!alreadyExists) {
        strokes.value.push(newSign);
      }
    })
    .subscribe();
});
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full h-[500px] bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden group shadow-inner"
  >
    <div
      class="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 p-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl hover:bg-white dark:hover:bg-zinc-900 transition-colors"
    >
      <div class="flex items-center gap-1 border-r border-zinc-200 dark:border-zinc-800 pr-1 mr-1">
        <UButton
          icon="i-heroicons-hand-raised"
          color="neutral"
          variant="ghost"
          size="sm"
          :class="{ 'bg-zinc-100 dark:bg-zinc-800': tool === 'hand' }"
          @click="tool = 'hand'"
        />
        <UButton
          icon="i-heroicons-pencil"
          color="neutral"
          variant="ghost"
          size="sm"
          :class="{ 'bg-zinc-100 dark:bg-zinc-800': tool === 'pencil' }"
          @click="tool = 'pencil'"
        />
      </div>

      <div class="flex items-center gap-1">
        <UButton
          icon="i-heroicons-minus"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="zoom(-0.1)"
        />
        <span class="text-[10px] font-mono w-10 text-center text-zinc-500">
          {{ Math.round(scale * 100) }}%
        </span>
        <UButton
          icon="i-heroicons-plus"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="zoom(0.1)"
        />
      </div>

      <div class="flex items-center gap-1 border-l border-zinc-200 dark:border-zinc-800 pl-1 ml-1">
        <UButton
          icon="i-heroicons-arrows-pointing-in"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="resetView"
        />
      </div>
    </div>

    <canvas
      ref="canvasRef"
      class="w-full h-full touch-none"
      :class="
        tool === 'hand' ? (isInteracting ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-crosshair'
      "
      @mousedown="handleStart"
      @mousemove="handleMove"
      @mouseup="handleEnd"
      @mouseleave="handleEnd"
      @touchstart.prevent="handleStart"
      @touchmove.prevent="handleMove"
      @touchend="handleEnd"
    />

    <div class="absolute bottom-4 left-4 pointer-events-none opacity-40">
      <p class="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
        X: {{ Math.round(offset.x) }}, Y: {{ Math.round(offset.y) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
canvas {
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
