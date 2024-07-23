const Copyright = () => {
    return (
      <div className="w-full flex justify-center p-2">
        <div className="copyright absolute bottom-0 text-sm pb-2 text-white dark:text-black">
          © {new Date().getFullYear()} Abhi-1441. All rights reserved.
        </div>
      </div>
    );
  }

export default Copyright;