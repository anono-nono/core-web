<script lang="ts" module>
  // export let collectionname = "entities";
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { Acl } from "$lib/acl";
  import { HotkeyButton } from "$lib/components/ui/hotkeybutton/index.js";
  import { CustomSuperDebug } from "$lib/customsuperdebug/index.js";
  import { ObjectInput } from "$lib/objectinput/index.js";
  import { auth } from "$lib/stores/auth.svelte.js";
  import { Check } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import { defaults, superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { editFormSchema } from "../../schema.js";

  let loading = $state(false);
  let errormessage = $state("");
  const { data } = $props();
  const collection = data.collection;
  const id = data.id;
  const form = superForm(defaults(zod(editFormSchema)), {
    dataType: "json",
    validators: zod(editFormSchema),
    SPA: true,
    onUpdate: async ({ form, cancel }) => {
      loading = true;
      if (form.valid) {
        try {
          await auth.client.UpdateOne({
            collectionname: collection,
            item: { ...form.data, _id: id },
            jwt: auth.access_token,
          });
          toast.success(collection + " updated");
          goto(base + `/entities`);
        } catch (error: any) {
          errormessage = error.message;
          toast.error("Error", {
            description: error.message,
          });
          cancel();
        } finally {
          loading = false;
        }
      } else {
        let errors = Object.keys(form.errors).map((key) => key + " is " + form.errors[key]);
        if(errors.length > 0) {
          toast.error("Error", {
            description: errors.join(", "),
          });
        } else {
          toast.error("Error", {
            description: "Form is invalid",
          });
        }
        cancel();
        loading = false;
      }
    },
  });
  const { form: formData, enhance, message, validateForm } = form;
  try {
    formData.set(data.data.form.data);
    validateForm({ update: true });
  } catch (error: any) {
    toast.error("Error while enhancing", {
      description: error.message,
    });
  }
</script>

<div class="px-1">
  {#if errormessage && errormessage != ""}
    {errormessage}
  {/if}

  <form method="POST" use:enhance>
    <Acl bind:value={$formData} />

    <ObjectInput height="min-h-[64vh] mb-10" bind:value={$formData} />

    <HotkeyButton
      variant="success"
      size="base"
      disabled={loading}
      aria-label="Update Item"
      type="submit"
      data-shortcut="ctrl+s"
    >
      <Check />
      Update Item</HotkeyButton
    >
  </form>

  <CustomSuperDebug {formData} />
</div>
