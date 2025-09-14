export const useESMScript = <T = any>(modulePath: string) => {
  const lib = ref<T | null>(null);
  const loaded = ref(false);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const load = async () => {
    if (loaded.value || loading.value) return;

    loading.value = true;
    try {
      const mod: T = await import(/* @vite-ignore */ modulePath);
      lib.value = mod;
      loaded.value = true;
    } catch (err) {
      error.value = err as Error;
      console.error(`❌ Error al cargar ${modulePath}:`, err);
    } finally {
      loading.value = false;
    }
  };

  return { lib, loaded, error, loading, load };
};
