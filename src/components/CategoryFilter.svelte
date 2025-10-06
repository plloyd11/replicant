<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let categories: string[] = [];
    export let sizes: string[] = [];

    const dispatch = createEventDispatcher();

    // Track selected filters
    let selectedCategories: Set<string> = new Set();
    let selectedSizes: Set<string> = new Set();

    // Filter out 'All' from the lists as we'll handle it separately
    $: categoriesList = categories.filter((c) => c !== 'All');
    $: sizesList = sizes.filter((s) => s !== 'All');

    function handleFilterChange() {
        const filters = {
            categories: Array.from(selectedCategories),
            sizes: Array.from(selectedSizes),
        };

        dispatch('filterChange', filters);
        const event = new CustomEvent('filtersChange', {
            detail: filters,
            bubbles: true,
        });
        document.dispatchEvent(event);
    }

    function toggleCategory(category: string) {
        if (selectedCategories.has(category)) {
            selectedCategories.delete(category);
        } else {
            selectedCategories.add(category);
        }
        selectedCategories = selectedCategories; // Trigger reactivity
        handleFilterChange();
    }

    function toggleSize(size: string) {
        if (selectedSizes.has(size)) {
            selectedSizes.delete(size);
        } else {
            selectedSizes.add(size);
        }
        selectedSizes = selectedSizes; // Trigger reactivity
        handleFilterChange();
    }

    function toggleFilterSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        const button = document.querySelector(`[commandfor="${sectionId}"]`);

        if (section) {
            const isHidden = section.hasAttribute('hidden');
            if (isHidden) {
                section.removeAttribute('hidden');
                button?.setAttribute('aria-expanded', 'true');
            } else {
                section.setAttribute('hidden', '');
                button?.setAttribute('aria-expanded', 'false');
            }
        }
    }

    function openMobileFilters() {
        const dialog = document.getElementById('mobile-filters') as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    }

    function closeMobileFilters() {
        const dialog = document.getElementById('mobile-filters') as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    }
</script>

<main class="px-4 py-4 sm:py-12 lg:px-8">
    <div class="lg:grid lg:grid-cols-6 lg:gap-x-8">
        <aside>
            <h2 class="sr-only">Filters</h2>

            <!-- Mobile filter button -->
            <button
                type="button"
                on:click={openMobileFilters}
                class="inline-flex items-center lg:hidden text-replicant-100 hover:text-primary"
            >
                <span class="text-sm font-medium">Filters</span>
                <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    class="ml-1 size-5 shrink-0"
                >
                    <path
                        d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
                    />
                </svg>
            </button>

            <!-- Desktop filters -->
            <div class="hidden lg:block">
                <form class="divide-y divide-gray-200/10">
                    {#if categoriesList.length > 0}
                        <div class="py-6 first:pt-0 last:pb-0">
                            <fieldset>
                                <legend class="block text-lg font-medium text-replicant-100"
                                    >Category</legend
                                >
                                <div class="pt-6 space-y-3">
                                    {#each categoriesList as category, i}
                                        <div class="flex gap-3">
                                            <div class="flex items-center h-5 shrink-0">
                                                <div class="grid grid-cols-1 group size-4">
                                                    <input
                                                        id="category-{i}"
                                                        type="checkbox"
                                                        checked={selectedCategories.has(category)}
                                                        on:change={() => toggleCategory(category)}
                                                        class="col-start-1 row-start-1 bg-transparent rounded-sm border appearance-none border-replicant-600 checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                                    />
                                                    <svg
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        class="col-start-1 row-start-1 justify-self-center self-center pointer-events-none size-3.5 stroke-replicant-900"
                                                    >
                                                        <path
                                                            d="M3 8L6 11L11 3.5"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="opacity-0 group-has-[:checked]:opacity-100"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label
                                                for="category-{i}"
                                                class="capitalize text-replicant-300"
                                                >{category}</label
                                            >
                                        </div>
                                    {/each}
                                </div>
                            </fieldset>
                        </div>
                    {/if}

                    {#if sizesList.length > 0}
                        <div class="py-6 first:pt-0 last:pb-0">
                            <fieldset>
                                <legend class="block text-lg font-medium text-replicant-100"
                                    >Sizes</legend
                                >
                                <div class="pt-6 space-y-3">
                                    {#each sizesList as size, i}
                                        <div class="flex gap-3">
                                            <div class="flex items-center h-5 shrink-0">
                                                <div class="grid grid-cols-1 group size-4">
                                                    <input
                                                        id="sizes-{i}"
                                                        type="checkbox"
                                                        checked={selectedSizes.has(size)}
                                                        on:change={() => toggleSize(size)}
                                                        class="col-start-1 row-start-1 bg-transparent rounded-sm border appearance-none border-replicant-600 checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                                    />
                                                    <svg
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        class="col-start-1 row-start-1 justify-self-center self-center pointer-events-none size-3.5 stroke-replicant-900"
                                                    >
                                                        <path
                                                            d="M3 8L6 11L11 3.5"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="opacity-0 group-has-[:checked]:opacity-100"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label
                                                for="sizes-{i}"
                                                class="capitalize text-replicant-300">{size}</label
                                            >
                                        </div>
                                    {/each}
                                </div>
                            </fieldset>
                        </div>
                    {/if}
                </form>
            </div>
        </aside>

        <!-- Product grid (slot for products) -->
        <div class="mt-6 lg:col-span-5 lg:mt-0">
            <slot />
        </div>
    </div>
</main>

<!-- Mobile filter dialog -->
<dialog
    id="mobile-filters"
    class="overflow-hidden rounded-lg backdrop:bg-black/50 lg:hidden"
    on:click={(e) => {
        if (e.target === e.currentTarget) closeMobileFilters();
    }}
>
    <div
        class="fixed inset-0 transition-opacity duration-300 ease-linear bg-black/25 data-closed:opacity-0"
    ></div>

    <div class="flex fixed inset-0 focus:outline-none">
        <div
            class="flex overflow-y-auto relative flex-col pt-4 pb-6 ml-auto max-w-xs shadow-xl transform size-full bg-replicant-900"
        >
            <div class="flex justify-between items-center px-4">
                <h2 class="text-lg font-medium text-replicant-100">Filters</h2>
                <button
                    type="button"
                    on:click={closeMobileFilters}
                    class="flex relative justify-center items-center p-2 -mr-2 rounded-md size-10 text-replicant-400 hover:text-replicant-100 focus:ring-2 focus:ring-primary focus:outline-hidden"
                >
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Close menu</span>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        data-slot="icon"
                        aria-hidden="true"
                        class="size-6"
                    >
                        <path
                            d="M6 18 18 6M6 6l12 12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <!-- Filters -->
            <form class="mt-4">
                {#if categoriesList.length > 0}
                    <div class="pt-4 pb-4 border-t border-gray-200/10">
                        <fieldset>
                            <legend class="px-2 w-full">
                                <button
                                    type="button"
                                    on:click={() =>
                                        toggleFilterSection('filter-section-category-mobile')}
                                    class="flex justify-between items-center p-2 w-full text-replicant-400 hover:text-replicant-100"
                                    commandfor="filter-section-category-mobile"
                                >
                                    <span class="text-sm font-medium text-replicant-100"
                                        >Category</span
                                    >
                                    <span class="flex items-center ml-6 h-7">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-slot="icon"
                                            aria-hidden="true"
                                            class="transform rotate-0 size-5"
                                        >
                                            <path
                                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </legend>
                            <div
                                id="filter-section-category-mobile"
                                hidden
                                class="block px-4 pt-4 pb-2"
                            >
                                <div class="space-y-6">
                                    {#each categoriesList as category, i}
                                        <div class="flex gap-3">
                                            <div class="flex items-center h-5 shrink-0">
                                                <div class="grid grid-cols-1 group size-4">
                                                    <input
                                                        id="category-{i}-mobile"
                                                        type="checkbox"
                                                        checked={selectedCategories.has(category)}
                                                        on:change={() => toggleCategory(category)}
                                                        class="col-start-1 row-start-1 bg-transparent rounded-sm border appearance-none border-replicant-600 checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                                    />
                                                    <svg
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        class="col-start-1 row-start-1 justify-self-center self-center pointer-events-none size-3.5 stroke-replicant-900"
                                                    >
                                                        <path
                                                            d="M3 8L6 11L11 3.5"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="opacity-0 group-has-[:checked]:opacity-100"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label
                                                for="category-{i}-mobile"
                                                class="capitalize text-replicant-300"
                                                >{category}</label
                                            >
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </fieldset>
                    </div>
                {/if}

                {#if sizesList.length > 0}
                    <div class="pt-4 pb-4 border-t border-gray-200/10">
                        <fieldset>
                            <legend class="px-2 w-full">
                                <button
                                    type="button"
                                    on:click={() =>
                                        toggleFilterSection('filter-section-sizes-mobile')}
                                    class="flex justify-between items-center p-2 w-full text-replicant-400 hover:text-replicant-100"
                                    commandfor="filter-section-sizes-mobile"
                                >
                                    <span class="text-sm font-medium text-replicant-100">Sizes</span
                                    >
                                    <span class="flex items-center ml-6 h-7">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            data-slot="icon"
                                            aria-hidden="true"
                                            class="transform rotate-0 size-5"
                                        >
                                            <path
                                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </legend>
                            <div
                                id="filter-section-sizes-mobile"
                                hidden
                                class="block px-4 pt-4 pb-2"
                            >
                                <div class="space-y-6">
                                    {#each sizesList as size, i}
                                        <div class="flex gap-3">
                                            <div class="flex items-center h-5 shrink-0">
                                                <div class="grid grid-cols-1 group size-4">
                                                    <input
                                                        id="sizes-{i}-mobile"
                                                        type="checkbox"
                                                        checked={selectedSizes.has(size)}
                                                        on:change={() => toggleSize(size)}
                                                        class="col-start-1 row-start-1 bg-transparent rounded-sm border appearance-none border-replicant-600 checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                                    />
                                                    <svg
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        class="col-start-1 row-start-1 justify-self-center self-center pointer-events-none size-3.5 stroke-replicant-900"
                                                    >
                                                        <path
                                                            d="M3 8L6 11L11 3.5"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="opacity-0 group-has-[:checked]:opacity-100"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label
                                                for="sizes-{i}-mobile"
                                                class="capitalize text-replicant-300">{size}</label
                                            >
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </fieldset>
                    </div>
                {/if}
            </form>
        </div>
    </div>
</dialog>
