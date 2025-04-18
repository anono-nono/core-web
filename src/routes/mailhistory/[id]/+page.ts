import { auth } from "$lib/stores/auth.svelte.js";
import type { PageLoad } from "./$types.js";
export const load: PageLoad = async ({ parent, params }) => {
  const { access_token } = await parent();
  try {
    let item = await auth.client.FindOne<any>({ collectionname: "mailhist", query: { _id: params.id }, jwt: access_token });
    return { item };
  } catch (error) {
    return { item: null };    
  }
};
