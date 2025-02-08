
export default function AuthLayout({ title, children, footerLink }) {
  
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex justify-center">
            <image
              src="/infoware.png"
              alt="Logo"
              width={200}
              height={100}
              className="h-10 w-auto"
            />
          </div>

          <h2 className="text-center text-3xl font-semibold tracking-tight text-[#0B2653]">
            {title}
          </h2>

         
          <div className="w-[80%]">{children}</div>

          <div className="mt-6 text-center text-sm">
            {footerLink}
          </div>
        </div>
      </div>

    </div>
  );
}
