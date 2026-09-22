<div class="space-y-4 max-w-3xl mx-auto">
  {#each [1, 2, 3, 4] as i}
    <div class="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
      <div class="flex items-center justify-between">
        <div class="h-5 w-3/4 rounded-lg skeleton-shimmer"></div>
        <div class="w-6 h-6 rounded-full skeleton-shimmer"></div>
      </div>
      <div class="h-4 w-5/6 rounded skeleton-shimmer opacity-70"></div>
    </div>
  {/each}
</div>

