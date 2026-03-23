"use client"

export default function InteractiveCard({ children } : { children:React.ReactNode }) {

  function onCardMouseAction (e:React.SyntheticEvent) {
    if (e.type === "mouseover") {
      e.currentTarget.classList.remove("shadow-lg");
      e.currentTarget.classList.add("shadow-2xl");
      e.currentTarget.classList.remove("bg-white");
      e.currentTarget.classList.add("bg-neutral-200");
    }
    else {
      e.currentTarget.classList.remove("shadow-2xl");
      e.currentTarget.classList.add("shadow-lg");
      e.currentTarget.classList.remove("bg-neutral-200");
      e.currentTarget.classList.add("bg-white");
    }
  }

  return (
    <div className="w-full h-[300px] rounded-lg shadow-lg bg-white" 
    onMouseOver={(e) => onCardMouseAction(e)}
    onMouseOut={(e) => onCardMouseAction(e)}>
      {children}
    </div>
  );
}