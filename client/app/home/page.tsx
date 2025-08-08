'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import {tools} from '@/assets/assets'
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { User } from '@supabase/supabase-js';

export default function LandingPage() {

  const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)  
  useEffect(() => {
  async function getUser() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      }

      setIsLoading(false);
    }

    getUser();
  }, [])

  async function handleSignOut() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  

   const handleClick = () => {
    if(!user)
    {
       router.push('auth/login')
    }
    else
    {
        router.push('dashboard')
    }
   
  }
  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10  font-sans">
      <header className="w-full flex items-center justify-between px-2 py-3 mb-6  shadow-sm relative">
  {/* Left: Brand */}
  <h1 className="text-xl font-bold text-gray-900 dark:text-white">ZenoFlair</h1>

  {/* Right: Avatar and Theme Toggle */}
  <div className="flex items-center gap-4">
    {user && (
      <div className="relative">
        {/* Avatar Button */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="focus:outline-none cursor-pointer"
        >
          <Avatar className="size-10 border border-white/10">
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt="User profile picture"
            />
            <AvatarFallback>{user.email?.[0] || 'U'}</AvatarFallback>
          </Avatar>
        </button>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-md shadow-lg z-50 border border-gray-200 dark:border-white/10">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    )}

    {/* Theme Toggle */}
    <div className='cursor-pointer'>
          <ThemeToggle />

    </div>
  </div>
</header>


      <section className="text-left max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Create AI Generated Content with{' '}
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#9333ea] to-[#ec4899] text-transparent bg-clip-text">
            ZenoFlair
          </span>
        </h2>
        <p className="text-lg /80 mb-6">
          Transform your creation with our suite of premium AI tools. Write articles, generate images, and enhance your content.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <ShimmerButton onClick={handleClick}>Start Creating Now</ShimmerButton>
          <ShimmerButton>Watch Demo</ShimmerButton>
        </div>
      </section>
       <section className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
         <section className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        {tools.map((tool, i, arr) => {
          if (i === 0 || i === 2) {
            return (
              <div
                key={i}
                className={`w-full relative p-[1px] rounded-xl bg-gradient-to-r ${tool.color} shadow-lg`}
              >
                <div className="bg-[#080029] rounded-xl p-6 h-full">
                  <div className="flex items-start gap-3">
                    {tool.icon}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-white/80">{tool.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          if (i === 1) {
            return (
              <div key="row-2" className="flex flex-row sm:flex-row gap-6">
                {[tool, arr[i + 1]].map((t, j) => (
                  <div
                    key={j}
                    className={`w-full sm:w-1/2 relative p-[1px] rounded-xl bg-gradient-to-r ${t.color} shadow-lg`}
                  >
                    <div className="bg-[#080029] rounded-xl p-6 h-full">
                      <div className="flex items-start gap-3 mb-2">
                        {t.icon}
                        <h3 className="text-xl font-semibold text-white">{t.title}</h3>
                      </div>
                      <p className="text-sm text-white/80">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          }

          return null
        })}
      </section>
      </section>
    </main>)
}
