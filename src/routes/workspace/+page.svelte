<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { HotkeyButton } from "$lib/components/ui/hotkeybutton/index.js";
  import { data as datacomponent } from "$lib/entities/data.svelte.js";
  import { Entities } from "$lib/entities/index.js";
  import { SearchInput } from "$lib/searchinput";
  import { auth } from "$lib/stores/auth.svelte.js";
  import { usersettings } from "$lib/stores/usersettings.svelte.js";
  import Warningdialogue from "$lib/warningdialogue/warningdialogue.svelte";
  import { Filter, Pencil, SquarePlus, Trash2 } from "lucide-svelte";
  import { toast } from "svelte-sonner";

  let { data } = $props();
  let ref: any;
  let loading = $state(false);
  datacomponent.parsesettings(data.settings);
  let searchstring = $state(datacomponent.settings.searchstring);
  let selected_items = $state([]);
  let entities = $state(data.entities);
  let showWarning = $state(false);
  let deleteData: any = $state({});

  async function deleteitem(item: any) {
    try {
      await auth.client.CustomCommand({
        command: "deleteworkspace",
        id: item._id,
        jwt: auth.access_token,
      });
      if (usersettings.currentworkspace === item._id) {
        usersettings.currentworkspace = "";
        await usersettings.dopersist();
      }

      selected_items = selected_items.filter((i) => i !== item._id);
      ref.reload();
      toast.success("Deleted successfully", {
        description: "",
      });
      datacomponent.persist();
    } catch (error: any) {
      toast.error("Error while deleting", {
        description: error.message,
      });
    }
  }
  async function deleteitems(ids: string[]) {
    try {
      for (let id of ids) {
        await auth.client.CustomCommand({
          command: "deleteworkspace",
          id: id,
          jwt: auth.access_token,
        });
        if (usersettings.currentworkspace === id) {
          usersettings.currentworkspace = "";
          await usersettings.dopersist();
        }
      }
      selected_items = [];
      ref.reload();
      toast.success("Deleted " + ids.length + " items successfully", {
        description: "",
      });
      datacomponent.persist();
    } catch (error: any) {
      toast.error("Error while deleting", {
        description: error.message,
      });
    }
  }
  function single_item_click(item: any) {
    goto(base + `/workspace/${item._id}`);
  }
  async function handleAccept() {
    try {
      await deleteitem(deleteData);
    } catch (error: any) {
      toast.error("Error while deleting", {
        description: error.message,
      });
    }
  }
</script>

<div class="lg:flex space-y-4 lg:space-y-0 justify-between mb-4 lg:space-x-5">
  <SearchInput bind:searchstring />

  <HotkeyButton
    title="Create Workspace (Insert Key)"
    data-shortcut="ins"
    size="sm"
    variant="base"
    disabled={loading}
    aria-label="Create Workspace"
    onclick={() => {
      loading = true;
      goto(base + `/workspace/new`);
    }}
  >
    <SquarePlus />
    Create Workspace</HotkeyButton
  >
</div>

<Entities
  collectionname={data.collectionname}
  bind:searchstring
  delete_selected={deleteitems}
  {single_item_click}
  total_count={data.total_count}
  bind:selected_items
  bind:entities
  bind:this={ref}
  bind:loading
>
  {#snippet action(item: any)}
    <HotkeyButton
      aria-label="Edit"
      disabled={loading}
      onclick={() => goto(base + `/workspace/${item._id}`)}
      size="tableicon"
      variant="icon"
    >
      <Pencil />
    </HotkeyButton>
    <HotkeyButton
      aria-label="Delete"
      disabled={loading}
      onclick={() => {
        deleteData = item;
        showWarning = !showWarning;
      }}
      size="tableicon"
      variant="danger"
    >
      <Trash2 />
    </HotkeyButton>
  {/snippet}
</Entities>

<Warningdialogue bind:showWarning type="delete" onaccept={handleAccept}
></Warningdialogue>
