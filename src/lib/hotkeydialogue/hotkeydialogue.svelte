<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { HotkeyButton } from "$lib/components/ui/hotkeybutton";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import { text } from "@sveltejs/kit";
	import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-svelte";

	let open = $state(false);

	let rootClass = "grid grid-cols-6";
	let textClass = "text-[#22477D] dark:text-yellow-300";
	let keydiv = "justify-self-end col-span-2";
	let actiontag = "col-span-4";
</script>

<Dialog.Root bind:open>
	<HotkeyButton
		data-shortcut={"?"}
		onclick={() => (open = !open)}
		class="hidden">Keyboard shortcuts</HotkeyButton
	>
	<Dialog.Content class="w-screen">
		<Dialog.Header>
			<Dialog.Title>Keyboard shortcuts</Dialog.Title>
			<Separator />
			<Dialog.Description class="w-full">
				<div class="grid grid-cols-2 overflow-auto p-2">
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>e</span>
						</div>

						<span class={actiontag}> : Goto entities </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>h</span>
						</div>

						<span class={actiontag}> : Goto home page </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>a</span>
						</div>

						<span class={actiontag}> : Goto agents page </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>w</span>
						</div>

						<span class={actiontag}> : Goto workitems page </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>i</span>
						</div>

						<span class={actiontag}> : Goto Git Repositories </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>u</span>
						</div>

						<span class={actiontag}> : Goto users page </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>r</span>
						</div>

						<span class={actiontag}> : Goto roles page </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>f</span>
						</div>

						<span class={actiontag}> : Goto grafana page </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>l</span>
						</div>

						<span class={actiontag}> : Goto licence page </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>b</span>
						</div>

						<span class={actiontag}> : Goto billing accounts </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>g</span>
							<span>+</span>
							<span class={textClass}>t</span>
						</div>

						<span class={actiontag}> : Open page tour </span>
					</div>
					<!-- <div class={rootClass}>
						<div class={keydiv}>
							<div class="text-yellow-300 flex">
								<ArrowUp class="h-4 w-4" />
								<ArrowRight class="h-4 w-4" />
							</div>
						</div>

						<span class={actiontag}> : Change collection </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<div class="text-yellow-300 flex">
								<ArrowLeft class="h-4 w-4" />
								<ArrowRight class="h-4 w-4" />
							</div>
						</div>

						<span class={actiontag}> : Change page </span>
					</div> -->
					<div class={rootClass}>
						<div class={keydiv}>
							<div class={"flex " + textClass}>
								<ArrowLeft class="h-4 w-4" />
								<ArrowUp class="h-4 w-4" />
								<ArrowRight class="h-4 w-4" />
								<ArrowDown class="h-4 w-4" />
							</div>
						</div>

						<span class={actiontag}> : Navigate entities </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>Ctrl</span>
							<span>+</span>
							<span class={textClass}>d</span>
						</div>

						<span class={actiontag}> : Open Debug pane </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>hold shift </span>
						</div>

						<span class={actiontag}> : Copy table cell text </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>Ctrl</span>
							<span>+</span>
							<span class={textClass}>f</span>
						</div>

						<span class={actiontag}> : Focus local search </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>Ctrl</span>
							<span>+</span>
							<span class={textClass}>s</span>
						</div>

						<span class={actiontag}> : Save form </span>
					</div>
					<div class={rootClass}>
						<div class={keydiv}>
							<span class={textClass}>Ins Key</span>
						</div>

						<span class={actiontag}> : Create Data </span>
					</div>
				</div>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
