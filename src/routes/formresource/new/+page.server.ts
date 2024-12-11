import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate, setError } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/stores/auth.svelte.js";
import { base } from "$app/paths";
import { newFormSchema } from "../schema.js";

const key = "formresource";

export const load: PageServerLoad = async ({ fetch, url, cookies, locals }) => {
  await auth.clientinit((locals as any).domain, url.origin, fetch, cookies);
  const defaultValues = {
    name: "entities",
    collection: "entities",
    aggregates: []
  }
  return {
    form: await superValidate(defaultValues, zod(newFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event: any) => {
    const form = await superValidate(event, zod(newFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    try {
      await auth.client.InsertOne({ collectionname: "forms", item: { ...form.data, _type: "resource" }, jwt: auth.access_token });
    } catch (err: any) {
      console.error(err);
      setError(form, 'name', err.message);
      return {
        form,
      };
    }
    throw redirect(303, base + `/${key}`);
  },
};
