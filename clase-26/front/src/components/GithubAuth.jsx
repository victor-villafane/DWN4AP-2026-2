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
        <button
            type="button"
            onClick={loginGithub}
            style={{display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", textDecoration: "none"}}
            className="flex items-center justify-center rounded-md px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full max-w-xs mx-auto"
        >
            <img 
                src="https://simpleicons.org/icons/github.svg" 
                alt="GitHub" 
                width="24" 
                height="24" 
            />
            <span>GitHub</span>
        </button>
    )
} 