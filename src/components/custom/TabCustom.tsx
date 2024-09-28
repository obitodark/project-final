import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Title } from "./Title"

type Items = {
  name: String;
  component: React.ReactElement;
  description?: string;
  title?: string;
}
interface Props {
  items: Items[]
}
export function TabsCustom({ items }: Props) {
  return (
    <Tabs defaultValue={`${items[0].name}`} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-none shadow-none">
        {items.map((item, index) => (
          <TabsTrigger key={index} value={`${item.name}`}>{item.name}</TabsTrigger>
        ))}
      </TabsList>
      {items.map((item, index) => (
        <TabsContent key={index} value={`${item.name}`} className="bg-none">
          <Card>
            <CardHeader>
              <Title title={item.title ? item.title : ""} subtitle={item.description ? item.description : ""} />
            </CardHeader>
            <CardContent className="space-y-2">
              {item.component}
            </CardContent>

          </Card>
        </TabsContent>
      ))}

    </Tabs>
  )
}
