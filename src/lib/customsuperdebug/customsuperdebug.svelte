<script lang="ts">
	import { HotkeyButton } from "$lib/components/ui/hotkeybutton";
	import SuperDebug from "sveltekit-superforms";
	let { formData, width = "" } = $props();
	let showdebug = $state(false);
</script>

{#if formData != null && showdebug == true}
	<div class={"mt-10" + (width ? " " + width : "")}>
		<SuperDebug data={formData} theme="vscode" />
	</div>
{/if}

<HotkeyButton
	hidden
	class="hidden"
	aria-label="Toggle debug"
	data-shortcut={"ctrl+d,meta+d"}
	onclick={() => (showdebug = !showdebug)}
/>
