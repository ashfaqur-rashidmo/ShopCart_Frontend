import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react"

const { cn } = require("@/lib/utils")

const Title = ({children,className}) => {
  return (
   <h2 className={cn("text-3xl font-bold text-shop_dark_green capitalize tracking-wide",className)}>{children}</h2>
)}

const SubText = ({children,className}) => {
  return (
  <p className={cn("text-gray-600",className)}>{children}</p>
)}

const SubTitle = ({children,className}) => {
  return (
  <p className={cn("font-semibold text-gray-900 font-sans",className)}>{children}</p>
)}

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over 100$",
    icon: <Truck size={45}/>
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45}/>
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45}/>
  },
  {
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45}/>
  },
]

export {Title,SubText,SubTitle,extraData}