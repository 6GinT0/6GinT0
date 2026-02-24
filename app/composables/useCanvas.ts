import { useEventListener, useDark } from "@vueuse/core";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  lightColor: string;
  darkColor: string;
}

export const useCanvas = (
  canvasRef: Ref<HTMLCanvasElement | null>,
  containerRef: Ref<HTMLElement | null>
) => {
  const isDark = useDark();
  const ctx = ref<CanvasRenderingContext2D | null>(null);

  const strokeColor = computed(() => (isDark.value ? "#ffffff" : "#202020"));
  const gridColor = computed(() =>
    isDark.value ? "rgba(255,255,255,0.05)" : "rgba(39,39,42,0.15)"
  );

  const scale = ref(1);
  const offset = ref({ x: 0, y: 0 });
  const tool = ref<"pencil" | "hand">("pencil");
  const isInteracting = ref(false);

  const strokes = ref<Stroke[]>([]);
  const currentStroke = ref<Point[]>([]);
  const remoteStrokes = ref<Record<string, Stroke>>({});

  const toWorld = (screenX: number, screenY: number) => {
    if (!canvasRef.value) return { x: 0, y: 0 };
    const cx = canvasRef.value.width / 2;
    const cy = canvasRef.value.height / 2;
    return {
      x: (screenX - cx) / scale.value + offset.value.x,
      y: (cy - screenY) / scale.value + offset.value.y
    };
  };

  const draw = () => {
    if (!ctx.value || !canvasRef.value) return;
    const { width, height } = canvasRef.value;

    ctx.value.clearRect(0, 0, width, height);

    const step = 30;
    const worldLeft = toWorld(0, 0).x;
    const worldRight = toWorld(width, 0).x;
    const worldTop = toWorld(0, 0).y;
    const worldBottom = toWorld(0, height).y;

    const cx = width / 2;
    const cy = height / 2;

    ctx.value.beginPath();
    ctx.value.strokeStyle = gridColor.value;
    ctx.value.lineWidth = 1;

    for (let x = Math.floor(worldLeft / step) * step; x <= worldRight; x += step) {
      const sx = cx + (x - offset.value.x) * scale.value;
      ctx.value.moveTo(sx, 0);
      ctx.value.lineTo(sx, height);
    }
    for (let y = Math.floor(worldBottom / step) * step; y <= worldTop; y += step) {
      const sy = cy - (y - offset.value.y) * scale.value;
      ctx.value.moveTo(0, sy);
      ctx.value.lineTo(width, sy);
    }
    ctx.value.stroke();

    ctx.value.lineCap = "round";
    ctx.value.lineJoin = "round";

    const drawPoints = (points: Point[], color: string) => {
      if (points.length < 2 || !ctx.value) return;
      ctx.value.beginPath();
      ctx.value.strokeStyle = color;
      ctx.value.lineWidth = 3 * scale.value;

      const start = points[0];
      if (!start) return;

      ctx.value.moveTo(
        cx + (start.x - offset.value.x) * scale.value,
        cy - (start.y - offset.value.y) * scale.value
      );

      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        if (!p) continue;
        ctx.value.lineTo(
          cx + (p.x - offset.value.x) * scale.value,
          cy - (p.y - offset.value.y) * scale.value
        );
      }
      ctx.value.stroke();
    };

    strokes.value.forEach((s) => {
      drawPoints(s.points, isDark.value ? s.darkColor : s.lightColor);
    });

    Object.values(remoteStrokes.value).forEach((s) => {
      drawPoints(s.points, isDark.value ? s.darkColor : s.lightColor);
    });

    if (currentStroke.value.length > 0) {
      drawPoints(currentStroke.value, strokeColor.value);
    }
  };

  const setupCanvas = () => {
    if (!canvasRef.value || !containerRef.value) return;
    canvasRef.value.width = containerRef.value.clientWidth;
    canvasRef.value.height = containerRef.value.clientHeight;
    draw();
  };

  useEventListener(window, "resize", setupCanvas);

  let lastPos = { x: 0, y: 0 };

  const handleStart = (e: MouseEvent | TouchEvent) => {
    if (!canvasRef.value) return;
    isInteracting.value = true;
    const rect = canvasRef.value.getBoundingClientRect();
    const clientX = "touches" in e ? (e.touches[0]?.clientX ?? 0) : (e as MouseEvent).clientX;
    const clientY = "touches" in e ? (e.touches[0]?.clientY ?? 0) : (e as MouseEvent).clientY;

    lastPos = { x: clientX - rect.left, y: clientY - rect.top };

    if (tool.value === "pencil") {
      currentStroke.value = [toWorld(lastPos.x, lastPos.y)];
    }
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isInteracting.value || !canvasRef.value) return;
    const rect = canvasRef.value.getBoundingClientRect();
    const clientX = "touches" in e ? (e.touches[0]?.clientX ?? 0) : (e as MouseEvent).clientX;
    const clientY = "touches" in e ? (e.touches[0]?.clientY ?? 0) : (e as MouseEvent).clientY;
    const currentPos = { x: clientX - rect.left, y: clientY - rect.top };

    if (tool.value === "hand") {
      offset.value.x -= (currentPos.x - lastPos.x) / scale.value;
      offset.value.y += (currentPos.y - lastPos.y) / scale.value;
    } else {
      currentStroke.value.push(toWorld(currentPos.x, currentPos.y));
    }

    lastPos = currentPos;
    draw();
  };

  const handleEnd = () => {
    if (!isInteracting.value) return;
    isInteracting.value = false;

    if (tool.value === "pencil" && currentStroke.value.length > 1) {
      strokes.value.push({
        points: [...currentStroke.value],
        lightColor: "#202020",
        darkColor: "#ffffff"
      });
    }
    currentStroke.value = [];
    draw();
  };

  const zoom = (delta: number) => {
    scale.value = Math.max(0.2, Math.min(5, scale.value + delta));
    draw();
  };

  const resetView = () => {
    scale.value = 1;
    offset.value = { x: 0, y: 0 };
    draw();
  };

  onMounted(() => {
    if (canvasRef.value) {
      ctx.value = canvasRef.value.getContext("2d");
    }
    setupCanvas();
  });

  watch(
    [isDark, strokeColor, () => strokes.value, () => remoteStrokes.value],
    () => {
      draw();
    },
    { deep: true }
  );

  return {
    scale,
    offset,
    tool,
    isInteracting,
    strokes,
    currentStroke,
    remoteStrokes,
    handleStart,
    handleMove,
    handleEnd,
    zoom,
    resetView,
    strokeColor
  };
};
