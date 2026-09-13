import { supabase } from "../supabaseClient";

export function UserCard(props) {
  const { user, users, setUsers } = props;

  async function handleSave() {
    const { isSave, ...userData } = user;

    const { error } = await supabase.from("saved_users").upsert(
      {
        id: user.id,
        user_data: userData,
      },
      {
        onConflict: "id",
      },
    );

    if (error) {
      console.error("Error saving user:", error);
      return;
    }

    const newUsers = users.map((mapUser) => {
      if (mapUser.id === user.id) {
        return { ...mapUser, isSave: true };
      } else {
        return mapUser;
      }
    });
    setUsers(newUsers);
  }

  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl items-center shadow bg-gray-400">
      <h3 className="font-bold text-lg">Name: {user.name}</h3>
      <p className="text-sm text-slate-700">Username: @{user.username}</p>
      <div>
        <p className="text-sm">Email: {user.email}</p>
        <p className="text-sm">Street: {user.address.street}</p>
        <p className="text-sm">Suite: {user.address.suite}</p>
        <p className="text-sm">City: {user.address.city}</p>
        <p className="text-sm">Zipcode: {user.address.zipcode}</p>
        <p className="text-sm">LAT: {user.address.geo.lat}</p>
        <p className="text-sm">LNG: {user.address.geo.lng}</p>
        <p className="text-sm">Contact: {user.phone}</p>
        <p className="text-sm">Website: {user.website}</p>
        <p className="text-sm">Company name: {user.company.name}</p>
        <p className="text-sm">CatchPhrase: {user.company.catchPhrase}</p>
        <p className="text-sm">Bs: {user.company.bs}</p>
      </div>

      <button
        onClick={handleSave}
        className={`p-2 bg-blue-300 rounded-xl hover:bg-blue-400 ease-in-out duration-200 mt-2 ${user.isSave ? "bg-green-400" : "bg-blue-400"}`}
      >
        {user.isSave ? "SAVED" : "SAVE USER"}
      </button>
    </div>
  );
}
