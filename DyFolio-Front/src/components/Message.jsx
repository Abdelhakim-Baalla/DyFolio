export default function Message(){
  const name = "Abdelhakim Baalla";

    return (
      <div>
        {name ? <h1>Hello, {name}! </h1> : <h1>HELLO WORLD!</h1>}
      </div>
    );
}