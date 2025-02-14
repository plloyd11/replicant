<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let categories: string[] = [];
    export let selectedCategory = 'All';

    const dispatch = createEventDispatcher();

    $: sortedCategories = [
        'All',
        ...categories.filter((c) => c !== 'All').sort((a, b) => a.localeCompare(b)),
    ];

    function handleCategoryChange(category: string) {
        selectedCategory = category;
        dispatch('filterChange', { category });
        const event = new CustomEvent('categoryChange', { detail: { category }, bubbles: true });
        document.dispatchEvent(event);
    }
</script>

<div class="mx-auto mb-4 text-center">
    <div class="flex flex-wrap justify-center gap-4">
        {#each sortedCategories as category}
            <button
                class="px-4 py-1.5 rounded-full hover:bg-primaryColor {selectedCategory === category
                    ? 'bg-primaryColor text-replicant-900'
                    : 'bg-replicant-800 text-replicant-100'}"
                on:click={() => handleCategoryChange(category)}
            >
                {category}
            </button>
        {/each}
    </div>
</div>
