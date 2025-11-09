export default function Message(){
  const name = "Abdelhakim Baalla";

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className=" text-center p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
          {name ? (
            <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400">Hello, {name}!</h1>
          ) : (
            <h1 className="text-3xl font-extrabold">HELLO WORLD!</h1>
          )}
        </div>
      </div>
    );
}