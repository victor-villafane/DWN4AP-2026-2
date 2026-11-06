import { supabase } from "../services/supabase"

export default function GithubAuth(){
    
    const loginGithub = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        console.log("error", error)
    }

    return (
        <div onClick={loginGithub} >
            Github
        </div>
    )
} 