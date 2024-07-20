<script>
    import { createEventDispatcher } from 'svelte';

    export let categories = [];
    export let selectedCategory = 'All';

    const dispatch = createEventDispatcher();

    // Reactive statement to sort categories
    $: sortedCategories = [
        'All',
        ...categories.filter((c) => c !== 'All').sort((a, b) => a.localeCompare(b)),
    ];

    function handleCategoryChange(category) {
        selectedCategory = category;
        dispatch('filterChange', { category });
        // Dispatch a custom event that can be caught by the parent
        const event = new CustomEvent('categoryChange', { detail: { category }, bubbles: true });
        document.dispatchEvent(event);
    }
</script>

<div class="mx-auto mb-4 text-center">
    <div class="flex flex-wrap justify-center gap-4">
        {#each sortedCategories as category}
            <button
                class="px-4 py-1.5 rounded-full hover:bg-primaryColor {selectedCategory === category
                    ? 'bg-primaryColor text-replicant-200'
                    : 'bg-replicant-800 text-replicant-100'}"
                on:click={() => handleCategoryChange(category)}
            >
                {category}
            </button>
        {/each}
    </div>
</div>
