import { supabase } from "../services/supabase"



export default function NotionAuth(){
    
    const loginNotion = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "notion",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        console.log("error", error)
    }

    return (
        <div onClick={loginNotion} >
            Notion
        </div>
    )
} 