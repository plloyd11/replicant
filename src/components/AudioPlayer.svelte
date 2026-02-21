<script lang="ts">
    import { Howl } from 'howler';
    import { onDestroy } from 'svelte';

    interface Track {
        num: string;
        name: string;
        duration: string;
        src: string;
    }

    let { tracks }: { tracks: Track[] } = $props();

    let currentIndex = $state(-1);
    let isPlaying = $state(false);
    let currentTime = $state(0);
    let totalDuration = $state(0);
    let error = $state<string | null>(null);
    let howl: Howl | null = null;
    let rafId: number | null = null;

    function formatTime(seconds: number): string {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    function stopRaf() {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    function startRaf() {
        stopRaf();
        function tick() {
            if (howl && isPlaying) {
                const s = howl.seek();
                if (typeof s === 'number') currentTime = s;
                if (totalDuration === 0) {
                    const d = howl.duration();
                    if (d > 0) totalDuration = d;
                }
                rafId = requestAnimationFrame(tick);
            }
        }
        rafId = requestAnimationFrame(tick);
    }

    function destroyHowl() {
        stopRaf();
        if (howl) {
            howl.unload();
            howl = null;
        }
    }

    function loadAndPlay(index: number) {
        if (index < 0 || index >= tracks.length) return;

        destroyHowl();
        error = null;
        currentIndex = index;
        currentTime = 0;
        totalDuration = 0;

        howl = new Howl({
            src: [tracks[index].src],
            html5: true,
            preload: true,
            onplay() {
                isPlaying = true;
                const d = howl!.duration();
                if (d > 0) totalDuration = d;
                startRaf();
            },
            onpause() {
                isPlaying = false;
                stopRaf();
            },
            onstop() {
                isPlaying = false;
                stopRaf();
            },
            onend() {
                isPlaying = false;
                stopRaf();
                // Auto-advance
                if (currentIndex < tracks.length - 1) {
                    loadAndPlay(currentIndex + 1);
                } else {
                    currentTime = 0;
                }
            },
            onloaderror(_id: number, err: unknown) {
                error = 'Could not load audio';
                isPlaying = false;
                stopRaf();
                console.warn('Howler load error:', err);
            },
            onplayerror(_id: number, err: unknown) {
                error = 'Playback error';
                isPlaying = false;
                stopRaf();
                console.warn('Howler play error:', err);
            },
            onseek() {
                currentTime = howl!.seek() as number;
            },
        });

        howl.play();
    }

    function togglePlay() {
        if (!howl) {
            if (tracks.length > 0) loadAndPlay(0);
            return;
        }
        if (isPlaying) {
            howl.pause();
        } else {
            howl.play();
        }
    }

    function playTrack(index: number) {
        if (index === currentIndex && howl) {
            togglePlay();
        } else {
            loadAndPlay(index);
        }
    }

    function prev() {
        if (currentIndex <= 0) {
            loadAndPlay(tracks.length - 1);
        } else {
            loadAndPlay(currentIndex - 1);
        }
    }

    function next() {
        if (currentIndex >= tracks.length - 1) {
            loadAndPlay(0);
        } else {
            loadAndPlay(currentIndex + 1);
        }
    }

    function seek(e: MouseEvent) {
        if (!howl || !totalDuration) return;
        const bar = e.currentTarget as HTMLElement;
        const rect = bar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        howl.seek(pct * totalDuration);
        if (!isPlaying) {
            howl.play();
        }
    }

    let progress = $derived(totalDuration > 0 ? Math.min(100, (currentTime / totalDuration) * 100) : 0);

    onDestroy(() => {
        destroyHowl();
    });
</script>

<section id="listen" class="fade-in px-6 lg:px-16 py-16 lg:py-20 border-t border-replicant-700">
    <div class="container mx-auto">
        <!-- Section header -->
        <div
            class="flex items-center gap-4 mb-10 text-xs uppercase font-bold tracking-[0.25em] text-replicant-500"
        >
            Tracklist
            <span class="flex-1 h-px bg-replicant-700"></span>
        </div>

        <!-- Track list -->
        <div>
            {#each tracks as track, i}
                <button
                    type="button"
                    onclick={() => playTrack(i)}
                    class="grid grid-cols-[2.5rem_1fr_auto] items-center py-4 border-b border-replicant-700 transition-all duration-200 hover:bg-white/[0.015] hover:px-2 w-full text-left cursor-pointer bg-transparent border-x-0 border-t-0 {i ===
                    0
                        ? 'border-t'
                        : ''} {i === currentIndex ? 'text-primary' : ''}"
                >
                    <span
                        class="text-[0.7rem] font-bold {i === currentIndex
                            ? 'text-primary'
                            : 'text-replicant-500'}"
                    >
                        {#if i === currentIndex}
                            {#if isPlaying}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            {:else}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <polygon points="5,3 19,12 5,21" />
                                </svg>
                            {/if}
                        {:else}
                            {track.num}
                        {/if}
                    </span>
                    <span
                        class="text-[0.95rem] {i === currentIndex
                            ? 'text-primary'
                            : 'text-replicant-200'}"
                    >
                        {track.name}
                    </span>
                    <span
                        class="text-xs font-bold {i === currentIndex
                            ? 'text-primary'
                            : 'text-replicant-500'}"
                    >
                        {track.duration}
                    </span>
                </button>
            {/each}
        </div>

        <!-- Error state -->
        {#if error}
            <div class="mt-4 text-xs text-red-400 tracking-wide">
                {error} — {tracks[currentIndex]?.name ?? ''}
            </div>
        {/if}

        <!-- Transport bar -->
        <div class="mt-8 p-4 bg-replicant-900 border border-replicant-700">
            <!-- Progress bar -->
            <button
                type="button"
                class="w-full h-1.5 bg-replicant-700 cursor-pointer relative mb-4 border-none p-0 block"
                onclick={seek}
                aria-label="Seek"
            >
                <div
                    class="absolute left-0 top-0 h-full bg-primary transition-[width] duration-100"
                    style="width: {progress}%"
                ></div>
            </button>

            <div class="flex items-center gap-4">
                <!-- Prev -->
                <button
                    type="button"
                    onclick={prev}
                    class="bg-transparent border-none text-replicant-400 hover:text-replicant-200 cursor-pointer p-1 transition-colors duration-200"
                    aria-label="Previous track"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <rect x="3" y="5" width="3" height="14" />
                        <polygon points="21,5 9,12 21,19" />
                    </svg>
                </button>

                <!-- Play/Pause -->
                <button
                    type="button"
                    onclick={togglePlay}
                    class="bg-transparent border-none text-replicant-200 hover:text-primary cursor-pointer p-1 transition-colors duration-200"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {#if isPlaying}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <polygon points="5,3 19,12 5,21" />
                        </svg>
                    {/if}
                </button>

                <!-- Next -->
                <button
                    type="button"
                    onclick={next}
                    class="bg-transparent border-none text-replicant-400 hover:text-replicant-200 cursor-pointer p-1 transition-colors duration-200"
                    aria-label="Next track"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <polygon points="3,5 15,12 3,19" />
                        <rect x="18" y="5" width="3" height="14" />
                    </svg>
                </button>

                <!-- Time display -->
                <span class="text-xs font-bold text-replicant-500 ml-2 tabular-nums">
                    {formatTime(currentTime)} / {totalDuration > 0
                        ? formatTime(totalDuration)
                        : '--:--'}
                </span>

                <!-- Current track name -->
                {#if currentIndex >= 0}
                    <span class="text-xs text-replicant-400 ml-auto truncate max-w-[200px]">
                        {tracks[currentIndex].name}
                    </span>
                {/if}
            </div>
        </div>
    </div>
</section>
