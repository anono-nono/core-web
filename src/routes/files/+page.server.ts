import type { PageServerLoad } from "./$types.js";
import { data } from "$lib/entities/data.svelte.js";

export const load: PageServerLoad = async ({ fetch, url, cookies, locals, params }) => {
    const page = "files";
    const collectionname = "fs.files";
    data.loadsettings(page, cookies);
    let searchstring = data.settings.searchstring;
    const entities = await data.GetData(page, collectionname, searchstring, {});
    return { entities, searchstring };
};
