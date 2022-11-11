export default function ConfirmedBuy() {
  return (
    <div className="mt-10 p-5 flex gap-5 items-center justify-center">
      <span className="w-12 h-12 fill-lime-500">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
        </svg>
      </span>
      <h2 className="font-bold text-center text-3xl">Buying success</h2>
    </div>
  );
}
