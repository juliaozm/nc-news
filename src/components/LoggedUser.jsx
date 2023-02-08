export const LoggedUser = ({user}) => {
 
    return (
        <section className="user-info">
            <img src={user.avatar_url}></img>
            <p>Welcome, {user.username}!</p>
        </section>
        
    )
}