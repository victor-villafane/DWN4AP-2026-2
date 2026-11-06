import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://wzkhrikywsqwwkeaabzq.supabase.co",
    "sb_publishable_Ea2Acp9wG0ulloKhQKmsyQ_jeHgGWe1"
)

export async function validateUser(token){
    const { data, error } = await supabase.auth.getUser(token)
    if( error || !data.user ) throw new Error("")
    return data.user
}