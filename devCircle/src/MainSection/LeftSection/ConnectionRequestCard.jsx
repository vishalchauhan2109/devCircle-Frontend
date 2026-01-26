import axios from "axios";
import React from "react";
// import Button from "../../Button";

const ConnectionRequestCard = (props) => {
  // const { idx } = props
  const {setLoad} = props

  const { firstName, lastName, photoURL, _id } = props?.request
  // console.log({request})
  // console.log()
 
  const Resrequest = async (status,fromUserId) => {
    const data = await axios.post(
      `http://localhost:2100/request/review/${status}/${fromUserId}`,
      {},
      { withCredentials: true }
    );

    setLoad(data)
    console.log(data)
  };

// (request ===) ? 

  return (
    <div className="max-w-md mx-auto mt-8 rounded-2xl  from-purple-500 via-fuchsia-500 to-pink-500 shadow-lg">

      <div className="bg-[#1b0f2f] rounded-2xl p-5">

        {/* top */}
        <div className="flex items-center gap-4">

          {/* avatar */}
          <img
            src={photoURL ? photoURL : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAM1BMVEXl5uivtLissbXc3+Lo6eu0ub3h4+W3vL/Y2typr7S7v8LFyczMz9LCxsmts7nIzM7Q1dfkHyfHAAADfUlEQVR4nO2ay5akIAxABQICAvr/XztqPaYerYZooBbcRZ/uXt0TQgSSrms0Go1Go9FoNBqNRqPRaHQdAJiV5bfaMjdATdHrld6Pdv5HbSGwg5ZOigfz7z6oulrWp/9CD68kvKmmBda7T6O7l4yVomWG7yg9SSJUUAKr53XawUVT3GkSu0oLuvASQtheuRdsSSsYUE5JFrSCCeW0xqqcE1ZpzrtC2Q4GHacZX0aq8xlOQg4l0gq58Z64IgvoDgvUOz2/EsS8QM0LOLFL2UylZQdyZxXEzMVbQ8VttXFY2aXnzfXcrXcPlWKV6nqCE3etUhSnGVYp/Jf4PVSc6weeKBUYQwUkpZnI59RlnQ9e4fzUWKqU5qtUMOWX8zt8mQ6BLMV3LIaRunySUQp3iWlSP7p8pDPCz0oxloSfLJ6dIn9mGKWAKsV5TwbSwXNm5Dy6EGsC4+bryJkuWY/DhnZxiKxSEClSjvnpTFEuo5xVagF0vhP/E5XNPuclyaxESfXEm+YLYHMfzbgzarXKvJA6zovoE5OV67Iv8r4PU1ZZYH4Gelrhnz2TK9cIQadVmVf0Oz2uYeQ4jyxfGJRV0TgtXX7ECsqicVo5Ou9Jwf+o/wVYsaOVXF+l3w5d3NSSVZrtNy0V/+y4OzHWm5ZYGpKjFvI1XvMffaipdNOygxfSOSfl/FP7YH9lMsjYKYRgrfkVIfigskxnjLLTGKO/n2Z07+MYrFLLeFcNI2PH2C9ZLj8SfRmn6v0wqaJRA6MmL95dvivVjA+qzD5cZst6sS/0YqbjxD0OB52KwuWd0eeAWcZ4AUz93vdug5SkHpjCBWqUlDv7LVwu2uu9wERNfoVdtYS/+LgOasjMpL9wl2pBOBelBzLFq1IeLO6agNKS4ZLUguEqo4UkLxhMBaXJW25L6+yUScakGx55rs1Nb1vtW/kzr0PEMQQE5MQyntwyPiJR51LNNcVpA+JcKl+cbhCs4LqKuYHMznZ6DxtNyn2hZaoF72Q+hwK5BZpnNeZI5T0An7DK+OLkD5hS0Wip/KYClZTwD5DcFeoV5A7MmMs/j/S4UFFaemQSbrAR8jt6Z0D2l4ttvRuoum6KKuFmQIum+QriY0OeHCGDOS2UdkIc94A8IkWXOqzqJ4bJyBzOMRU43H1xXBT4blXbHBZ1LYvjDqVUBY6cGo1Go9FoVOAfSXwrD6SLIgsAAAAASUVORK5CYII="}
            alt="profile"
            className="w-16 h-16 rounded-full border-2 border-purple-400"
          />

          {/* info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-purple-300">
              {firstName + " " + lastName}
            </h2>

            <p className="text-sm text-purple-400/70">
              wants to connect with you
            </p>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-3 mt-5">

          {/* reject */}
          <button
            onClick={() => {Resrequest("rejected",_id)}}
            className="flex-1 py-2 rounded-lg border border-purple-400 
            text-purple-300 font-medium
            hover:bg-purple-500/20 transition"
          >
            Reject
          </button>

          {/* accept */}
          <button
          onClick={() => {Resrequest("accepted",_id)}}
            className="flex-1 py-2 rounded-lg
            bg-gradient-to-r from-purple-500 to-fuchsia-500
            text-white font-medium hover:opacity-90 transition"
          >
            Accept
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConnectionRequestCard;
