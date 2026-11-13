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
        <button
            type="button"
            onClick={loginGoogle}
            style={{display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", textDecoration: "none"}}
            className="flex items-center justify-center rounded-md px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full max-w-xs mx-auto"
        >
            <img 
                src="https://simpleicons.org/icons/google.svg" 
                alt="Google" 
                width="24" 
                height="24" 
            />
            <span>Google</span>
        </button>
    )
} 