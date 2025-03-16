/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'enndfjrjvqzggyqygdai.supabase.co',
          },
        ],
      },
};

export default nextConfig;
