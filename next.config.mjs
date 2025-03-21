/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  images: {
      //unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'enndfjrjvqzggyqygdai.supabase.co',
        },
      ],
    },
  //distDir: "out",
};

export default nextConfig;
