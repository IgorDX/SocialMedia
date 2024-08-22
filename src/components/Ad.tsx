import Image from "next/image"
const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponcored Ads</span>
        <Image src="/more.png" alt="More" width={16} height={16}></Image>
      </div>
      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/17815963/pexels-photo-17815963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="More"
            fill
            className="rounded-lg object-cover"
          ></Image>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/17815963/pexels-photo-17815963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="More"
            height={24}
            width={24}
            className="rounded-full w-6 h-6 object-cover"
          ></Image>
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci doloribus reiciendis ad numquam accusantium! Cum?"
            : size === "md"
              ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, quas doloremque eveniet ipsum nisi magnam voluptatem eius enim eum iusto accusamus fuga at eos quod."
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus et, quos recusandae non vel iure, consectetur doloremque nulla quibusdam voluptates ipsam illo earum, blanditiis dolorem quisquam nemo! Nisi ipsa deserunt perspiciatis eaque quae similique at id impedit, vitaeeius omnis nostrum dolore, expedita voluptas odit nesciunt cupiditate,fugit vero nihil."}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  )
}

export default Ad
