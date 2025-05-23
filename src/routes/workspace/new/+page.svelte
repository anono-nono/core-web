<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import posthog from "posthog-js";
  import * as Form from "$lib/components/ui/form/index.js";
  import { HotkeyButton } from "$lib/components/ui/hotkeybutton/index.js";
  import { CustomInput } from "$lib/custominput/index.js";
  import { CustomSuperDebug } from "$lib/customsuperdebug/index.js";
  import { auth } from "$lib/stores/auth.svelte.js";
  import { usersettings } from "$lib/stores/usersettings.svelte.js";
  import { Check } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import { defaults, superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { newWorkspaceSchema } from "../schema.js";

  let loading = $state(false);
  let errormessage = $state("");
  const form = superForm(defaults(zod(newWorkspaceSchema)), {
    dataType: "json",
    validators: zod(newWorkspaceSchema),
    SPA: true,
    onUpdate: async ({ form, cancel }) => {
      if (form.valid) {
        loading = true;
        try {
          const workspace = JSON.parse(
            await auth.client.CustomCommand({
              command: "ensureworkspace",
              data: JSON.stringify(form.data),
              jwt: auth.access_token,
            }),
          );
          toast.success("Workspace added");
          usersettings.currentworkspace = workspace._id;
          if(usersettings.currentworkspace != null && usersettings.currentworkspace != "") {
            try {
              posthog.group("workspace", usersettings.currentworkspace);
            } catch (error) {
            }
          }
          await usersettings.dopersist();
          goto(base + `/workspace/${workspace._id}`);
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
        errormessage = "Form is invalid";
        let errors = Object.keys(form.errors).map((key) => key + " is " + (form.errors as any)[key]);
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

  const { form: formData, enhance, message } = form;
</script>

{#if errormessage && errormessage != ""}
  {errormessage}
{/if}

{#if message && $message != ""}
  {$message}
{/if}
<form method="POST" use:enhance>
  <Form.Field {form} name="name" class="mb-10">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Workspace Name</Form.Label>
        <Form.Description
          >This is the name of your new workspace.</Form.Description
        >
        <CustomInput {...props} bind:value={$formData.name} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <div class="flex items-center space-x-5">
    <HotkeyButton
      variant="success"
      size="base"
      disabled={loading}
      aria-label="Create Workspace"
      type="submit"
      data-shortcut="ctrl+s"
    >
      <Check />
      Create Workspace</HotkeyButton
    >
    <HotkeyButton
      size="lg"
      aria-label="Cancel"
      onclick={() => goto(base + `/workspace`)}>Cancel</HotkeyButton
    >
  </div>
</form>

<CustomSuperDebug {formData} />
