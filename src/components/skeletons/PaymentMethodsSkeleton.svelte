<div class="space-y-2.5" aria-hidden="true">
  {#each [1, 2, 3, 4, 5, 6] as _}
    <div class="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-surface/60 p-3.5">
      <div class="h-6 w-10 shrink-0 rounded-md skeleton-shimmer"></div>
      <div class="h-4 w-28 rounded skeleton-shimmer"></div>
      <div class="ml-auto h-4 w-16 rounded skeleton-shimmer"></div>
    </div>
  {/each}
</div>
