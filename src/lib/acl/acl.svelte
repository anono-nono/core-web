<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import Hotkeybutton from "$lib/components/ui/hotkeybutton/hotkeybutton.svelte";
    import { EntitySelector } from "$lib/entityselector/index.js";
    import { auth } from "$lib/stores/auth.svelte.js";
    import {
        ChevronDown,
        ChevronUp,
        ListCheck,
        SquarePlus,
        Trash2,
    } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import { Ace } from "./index.js";

    let {
        class: className = "mb-10",
        value = $bindable(null),
        open = $bindable(null),
        loading = false,
    } = $props();
    let newid = $state("");

    async function addace(id: string) {
        if ("metadata" in value) {
            if (value.metadata._acl == null) {
                value.metadata._acl = [];
            }
            var item2 = await auth.client.FindOne<any>({
                collectionname: "users",
                query: { _id: id },
                jwt: auth.access_token,
            });
            const exists = value.metadata._acl.some(
                (ace: any) => ace._id === item2._id,
            );
            if (!exists) {
                value.metadata._acl = [
                    ...value.metadata._acl,
                    { _id: item2._id, name: item2.name, rights: 65535 },
                ];
            } else {
                toast.error("Role already exists in ACL");
            }
            newid = "";
        } else {
            if (value._acl == null) {
                value._acl = [];
            }
            var item = await auth.client.FindOne<any>({
                collectionname: "users",
                query: { _id: id },
                jwt: auth.access_token,
            });
            const exists = value._acl.some((ace: any) => ace._id === item._id);
            if (!exists) {
                value._acl = [
                    ...value._acl,
                    { _id: item._id, name: item.name, rights: 65535 },
                ];
            } else {
                toast.error("Role already exists in ACL");
            }
            newid = "";
        }
    }
</script>

<Accordion.Root
    type="single"
    class={`w-full ${open ? " border rounded-[10px] dark:border-bw600 dark:bg-bw850 dark:text-bw100" : ""}` +
        " " +
        className}
    value={open}
>
    <Accordion.Item value="item-1" class="border-0 p-0 m-0">
        <Hotkeybutton
            aria-label="Access Control List"
            class={open == "item-1"
                ? "flex items-center justify-between space-x-2 w-full border-0"
                : "max-w-52 dark:hover:bg-bw700 dark:hover:border-bw500"}
            variant="base"
            size="base"
            onclick={() => {
                if (open == "item-1") {
                    open = "";
                } else {
                    open = "item-1";
                }
            }}
        >
            <div class="flex items-center space-x-2">
                <ListCheck class="w-4 h-4" />
                <span> Access Control List </span>
            </div>
            {#if open == "item-1"}
                <ChevronUp class="w-4 h-4" />
            {:else}
                <ChevronDown class="w-4 h-4" />
            {/if}
        </Hotkeybutton>
        <Accordion.Content class="px-2.5 border-0 py-1">
            {#if "metadata" in value}
                {#each value.metadata._acl as ace, i}
                    <div
                        class="flex flex-col lg:flex-row items-center justify-between border dark:border-bw600 dark:bg-bw1000 p-0.75 rounded-lg my-1.5"
                    >
                        <Ace bind:value={value.metadata._acl[i]} {loading} />
                        <Hotkeybutton
                            aria-label="Delete"
                            disabled={loading}
                            class="ml-2.5 m-1"
                            variant="danger"
                            size="base"
                            onclick={() => {
                                value.metadata._acl.splice(i, 1);
                                if (value.metadata._acl.length == 0) {
                                    delete value.metadata._acl;
                                }
                                value = { ...value };
                            }}
                        >
                            <Trash2 class="w-4 h-4" />
                            Delete</Hotkeybutton
                        >
                    </div>
                {/each}
            {:else}
                {#each value._acl as ace, i}
                    <div
                        class="flex flex-col lg:flex-row items-center justify-between border dark:border-bw600 dark:bg-bw1000 p-0.75 rounded-lg my-1.5"
                    >
                        <Ace bind:value={value._acl[i]} {loading} />
                        <Hotkeybutton
                            aria-label="Delete"
                            disabled={loading}
                            class="ml-2.5 m-1"
                            variant="danger"
                            size="base"
                            onclick={() => {
                                value._acl.splice(i, 1);
                                if (value._acl.length == 0) {
                                    delete value._acl;
                                }
                                value = { ...value };
                            }}
                        >
                            <Trash2 class="w-4 h-4" />
                            Delete</Hotkeybutton
                        >
                    </div>
                {/each}
            {/if}
            <div class={"flex space-x-4 mt-4"}>
                <EntitySelector
                    width="min-w-[380px]"
                    name="role/user"
                    propertyname="_id"
                    bind:value={newid}
                    collectionname="users"
                    {loading}
                    basefilter={{
                        $or: [{ _type: "user" }, { _type: "role" }],
                    }}
                >
                    {#snippet rendername(item: any)}
                        {#if item._type == "user"}
                            ({item._type}) {item.name}
                            {item.email ? `/ ${item.email}` : ""}
                        {:else}
                            ({item._type}) {item.name}
                        {/if}
                    {/snippet}
                    {#snippet rendercontent(item: any)}
                        {#if item == null}
                            Select role/user
                        {:else if item._type == "user"}
                            ({item._type}) {item.name}
                            {item.email ? `/ ${item.email}` : ""}
                        {:else}
                            ({item._type}) {item.name}
                        {/if}
                    {/snippet}</EntitySelector
                >
                <Hotkeybutton
                    aria-label="Add"
                    disabled={loading}
                    variant="success"
                    size="base"
                    onclick={() => {
                        addace(newid);
                    }}
                >
                    <SquarePlus class="w-4 h-4" />
                    Add
                </Hotkeybutton>
            </div>
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
