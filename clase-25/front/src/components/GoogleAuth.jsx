import { supabase } from "../services/supabase"



export default function GoogleAuth(){
    
    const loginGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        console.log("error", error)
    }

    return (
        <div onClick={loginGoogle} >
            google
        </div>
    )
} 