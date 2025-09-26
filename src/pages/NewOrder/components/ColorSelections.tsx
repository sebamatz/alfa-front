import { useCallback, useContext } from "react";
import { useEffect, useState } from "react";
import { NewOrderContext } from "../NewOrderContext";
import { getItems } from "../../../api/fetch";
import { Search } from "lucide-react";
import { company } from "../../../config";

// shadcn/ui components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

interface IColorData {
  ccCPOUDRAID: number;
  sku: string;
}

export default function ColorSelections() {
  const { setColorValue, colorValue } = useContext(NewOrderContext);

  const [colorTypes, setColorTypes] = useState([]);
  const [colorType, setColorType] = useState(null);
  const [manifacturer, setManifacturer] = useState([]);
  const [selectedManifacturer, setSelectedManifacturer] = useState("");
  const [colorData, setColorData] = useState<IColorData[]>([]);

  const handleGetCollorData = async (boption: number) => {
    switch (boption) {
      case 30:
        const data30 = await getItems({ BOption: 30, Company: company });
        setColorTypes(
          data30.map((item: { id: number; name: string }) => ({
            id: item.id,
            name: item.name,
          }))
        );
        break;
      case 40:
        const data40 = await getItems({ BOption: 40, Company: company });
        setManifacturer(
          data40.map((item: { id: number; code: string }) => ({
            trdr: item.id,
            name: item.code,
          }))
        );
        break;
      default:
        break;
    }
  };

  const handleChangeColorType = useCallback(
    (value: string) => {
      //reset all values
      setColorValue(null);
      setSelectedManifacturer("");
      setManifacturer([]);
      setColorType(value);
    },
    [setColorType, setColorValue, setSelectedManifacturer, setManifacturer]
  );

  const handleChangeManifacturer = useCallback(
    (value: string) => {
      setColorValue(null);
      setSelectedManifacturer(value);
    },
    [setColorValue]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColorValue(event.target.value);
    },
    [setColorValue]
  );

  const handleGetColor = useCallback(async () => {
    const data: IColorData[] = await getItems({
      BOption: 50,
      Company: company,
      //if colorType is 3, then id is 20, else id is selectedManifacturer
      id: Number(colorType) === 3 ? 20 : Number(selectedManifacturer),
      LastId: Number(colorType),
      SearchValue: colorValue,
    });
    //[{"ccCPOUDRAID":15606,"sku":"SE802G-MATT-1002"}]
    setColorData(data);
  }, [colorType, colorValue, selectedManifacturer]);

  useEffect(() => {
    handleGetCollorData(30);
  }, []);

  useEffect(() => {
    if (colorType === "3") {
      handleGetCollorData(50);
      return;
    } else {
      handleGetCollorData(40);
    }
  }, [colorType]);

  useEffect(() => {
    if (selectedManifacturer && colorType !== "3") {
      handleGetColor();
    }
  }, [selectedManifacturer, handleGetColor, colorType]);

  return (
    <div className="flex flex-wrap gap-4">
      {/* Color Type Selection */}
      <div className="flex flex-col space-y-2 w-full max-w-xs">
        <Label htmlFor="color-type">Τύπος Χρώματος</Label>
        <Select value={colorType || ""} onValueChange={handleChangeColorType}>
          <SelectTrigger id="color-type">
            <SelectValue placeholder="Επιλέξτε τύπο χρώματος" />
          </SelectTrigger>
          <SelectContent>
            {colorTypes.map((colorType) => (
              <SelectItem key={colorType.id} value={colorType.id.toString()}>
                {colorType.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Conditional rendering based on color type */}
      {colorType === "3" ? (
        /* Direct color input for type 3 */
        <div className="flex items-end space-x-2">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="color-input">Κωδικός</Label>
            <Input
              id="color-input"
              placeholder="Κωδικός..."
              value={colorValue || ""}
              onChange={handleInputChange}
              className="w-48"
            />
          </div>
          <Search className="h-5 w-5 text-gray-500 mb-2" />
        </div>
      ) : (
        /* Manufacturer selection for other types */
        colorType && (
          <div className="flex flex-col space-y-2 w-full max-w-xs">
            <Label htmlFor="manufacturer">Επιλογή Κατασκευαστή</Label>
            <Select 
              value={selectedManifacturer || ""} 
              onValueChange={handleChangeManifacturer}
            >
              <SelectTrigger id="manufacturer">
                <SelectValue placeholder="Επιλέξτε κατασκευαστή" />
              </SelectTrigger>
              <SelectContent>
                {manifacturer.map((manufacturer: { trdr: number; name: string }) => (
                  <SelectItem key={manufacturer.trdr} value={manufacturer.trdr.toString()}>
                    {manufacturer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      )}

      {/* Color data selection - only show when manufacturer is selected */}
      {selectedManifacturer && colorType !== "3" && (
        <div className="flex items-end space-x-2">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="color-search">Αναζήτηση Χρώματος</Label>
            <select 
              id="color-search"
              className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={colorValue?.sku || ""}
              onChange={(e) => {
                const selectedColor = colorData.find(color => color.sku === e.target.value);
                setColorValue(selectedColor || e.target.value);
              }}
            >
              <option value="">Επιλέξτε χρώμα...</option>
              {colorData.map((color) => (
                <option key={color.ccCPOUDRAID} value={color.sku}>
                  {color.sku}
                </option>
              ))}
            </select>
          </div>
          <Search className="h-5 w-5 text-gray-500 mb-2" />
        </div>
      )}
    </div>
  );
}