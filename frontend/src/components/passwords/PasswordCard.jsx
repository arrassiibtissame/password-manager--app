function PasswordCard({item,show,onDelete}){
    return (
        <div className="p-4 bg-white/10 border border-white/20 rounded-xl mb-3 text-white">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p>{item.site}</p>
            <p>{item.username}</p>
            <p className ="mt-2">
                { show ? item.password : "••••••••" }

            </p>
            <button onClick={()=> onDelete(item._id)} className="mt-3 bg-red-500 hover:bg-red-500 px-3 py-1 rounded">Delete </button>
        </div>
    );
}
export default PasswordCard;