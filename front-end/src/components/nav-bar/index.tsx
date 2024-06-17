import { CartButton } from "./cart-button";

export function NavBar() {
  return (
    <nav className=" bg-slate-600/10 h-20 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="h-full flex items-center justify-between container">
        <p className="text-2xl font-bold">Rewards</p>
        <CartButton />
      </div>
    </nav>
  );
}
