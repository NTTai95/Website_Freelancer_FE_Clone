"use client";

import { useState, useEffect } from "react";
import { AlertCircle, MapPin, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { cn } from "@/lib/utils";

interface LocationOption {
  value: number;
  label: string;
  code?: string;
}

interface LocationSelectorProps {
  onLocationChange: (fullAddress: string) => void;
  error?: string;
  className?: string;
}

export function LocationSelector({
  onLocationChange,
  error,
  className,
}: LocationSelectorProps) {
  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [districts, setDistricts] = useState<LocationOption[]>([]);
  const [wards, setWards] = useState<LocationOption[]>([]);

  const [selectedProvince, setSelectedProvince] =
    useState<LocationOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    useState<LocationOption | null>(null);
  const [selectedWard, setSelectedWard] = useState<LocationOption | null>(null);
  const [streetNumber, setStreetNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingWards, setIsLoadingWards] = useState(false);

  // Lấy danh sách các tỉnh khi thành phần được gắn
  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        const formattedData = data.map((province: any) => ({
          value: province.code,
          label: province.name,
          code: province.code,
        }));
        setProvinces(formattedData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  // Lấy quận/huyện khi tỉnh/thành phố thay đổi
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict(null);
      return;
    }

    const fetchDistricts = async () => {
      setIsLoadingDistricts(true);
      try {
        const response = await fetch(
          `https://provinces.open-api.vn/api/p/${selectedProvince.value}?depth=2`
        );
        const data = await response.json();
        const formattedData = data.districts.map((district: any) => ({
          value: district.code,
          label: district.name,
          code: district.code,
        }));
        setDistricts(formattedData);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  // Lấy phường/xã khi quận/huyện thay đổi
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard(null);
      return;
    }

    const fetchWards = async () => {
      setIsLoadingWards(true);
      try {
        const response = await fetch(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.value}?depth=2`
        );
        const data = await response.json();
        const formattedData = data.wards.map((ward: any) => ({
          value: ward.code,
          label: ward.name,
          code: ward.code,
        }));
        setWards(formattedData);
      } catch (error) {
        console.error("Error fetching wards:", error);
      } finally {
        setIsLoadingWards(false);
      }
    };

    fetchWards();
  }, [selectedDistrict]);

  // Cập nhật địa chỉ khi bất kỳ vị trí nào thay đổi
  useEffect(() => {
    let address = "";

    if (streetNumber) {
      address = streetNumber;
    }

    if (selectedWard) {
      address = address
        ? `${address}, ${selectedWard.label}`
        : selectedWard.label;
    }

    if (selectedDistrict) {
      address = address
        ? `${address}, ${selectedDistrict.label}`
        : selectedDistrict.label;
    }

    if (selectedProvince) {
      address = address
        ? `${address}, ${selectedProvince.label}`
        : selectedProvince.label;
    }

    setFullAddress(address);
    onLocationChange(address);
  }, [
    selectedProvince,
    selectedDistrict,
    selectedWard,
    streetNumber,
    onLocationChange,
  ]);

  // Custom styles cho react-select
  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#0f3b87",
      borderColor: error ? "#ef4444" : state.isFocused ? "#3b82f6" : "#1e40af",
      boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#3b82f6" : "#1e40af",
      },
      borderRadius: "var(--radius)",
      minHeight: "40px",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#2563eb"
        : "transparent",
      color: "#e2e8f0",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#2563eb",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#1e3a8a",
      borderRadius: "var(--radius)",
      border: "1px solid #2563eb",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      zIndex: 50,
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#94a3b8",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#e2e8f0",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#e2e8f0",
    }),
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col">
        <Label className="text-sm font-medium text-white flex items-center mb-1">
          Địa chỉ công ty <span className="text-red-500 ml-1">*</span>
        </Label>

        {fullAddress && (
          <div className="p-3 mt-6 bg-[#0f3b87] rounded-md text-sm text-blue-100 border border-blue-700 shadow-inner">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-300 mb-0.5">
                  Địa chỉ đã chọn:
                </p>
                <p className="text-blue-100">{fullAddress}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Các dropdown địa chỉ trên cùng một hàng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-white">
            Tỉnh/Thành phố
          </Label>
          <Select
            options={provinces}
            value={selectedProvince}
            onChange={(option) => {
              setSelectedProvince(option as LocationOption);
              setSelectedDistrict(null);
              setSelectedWard(null);
            }}
            placeholder="Chọn Tỉnh/Thành phố"
            isLoading={isLoadingProvinces}
            isClearable
            isSearchable
            styles={{
              ...customSelectStyles,
              placeholder: (provided) => ({
                ...provided,
                color: "#94a3b8", // Màu placeholder nhạt hơn
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#e2e8f0", // Màu text khi đã chọn
              }),
              input: (provided) => ({
                ...provided,
                color: "#e2e8f0", // Màu text khi nhập
              }),
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3b82f6",
                primary75: "#3b82f6",
                primary50: "#3b82f6",
                primary25: "#3b82f6",
                neutral0: "#1e3a8a",
                neutral5: "#1e3a8a",
                neutral10: "#1e3a8a",
                neutral20: "#1e3a8a",
                neutral30: "#1e3a8a",
                neutral40: "#94a3b8",
                neutral50: "#94a3b8",
                neutral60: "#94a3b8",
                neutral70: "#94a3b8",
                neutral80: "#e2e8f0", // Màu text trong dropdown
                neutral90: "#e2e8f0",
              },
            })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-white">Quận/Huyện</Label>
          <Select
            options={districts}
            value={selectedDistrict}
            onChange={(option) => {
              setSelectedDistrict(option as LocationOption);
              setSelectedWard(null);
            }}
            placeholder="Chọn Quận/Huyện"
            isLoading={isLoadingDistricts}
            isClearable
            isSearchable
            isDisabled={!selectedProvince}
            styles={{
              ...customSelectStyles,
              placeholder: (provided) => ({
                ...provided,
                color: "#94a3b8", // Màu placeholder nhạt hơn
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#e2e8f0", // Màu text khi đã chọn
              }),
              input: (provided) => ({
                ...provided,
                color: "#e2e8f0", // Màu text khi nhập
              }),
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3b82f6",
                primary75: "#3b82f6",
                primary50: "#3b82f6",
                primary25: "#3b82f6",
                neutral0: "#1e3a8a",
                neutral5: "#1e3a8a",
                neutral10: "#1e3a8a",
                neutral20: "#1e3a8a",
                neutral30: "#1e3a8a",
                neutral40: "#94a3b8",
                neutral50: "#94a3b8",
                neutral60: "#94a3b8",
                neutral70: "#94a3b8",
                neutral80: "#e2e8f0", // Màu text trong dropdown
                neutral90: "#e2e8f0",
              },
            })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-white">Phường/Xã</Label>
          <Select
            options={wards}
            value={selectedWard}
            onChange={(option) => setSelectedWard(option as LocationOption)}
            placeholder="Chọn Phường/Xã"
            isLoading={isLoadingWards}
            isClearable
            isSearchable
            isDisabled={!selectedDistrict}
            styles={{
              ...customSelectStyles,
              placeholder: (provided) => ({
                ...provided,
                color: "#94a3b8", // Màu placeholder nhạt hơn
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#e2e8f0", // Màu text khi đã chọn
              }),
              input: (provided) => ({
                ...provided,
                color: "#e2e8f0", // Màu text khi nhập
              }),
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3b82f6",
                primary75: "#3b82f6",
                primary50: "#3b82f6",
                primary25: "#3b82f6",
                neutral0: "#1e3a8a",
                neutral5: "#1e3a8a",
                neutral10: "#1e3a8a",
                neutral20: "#1e3a8a",
                neutral30: "#1e3a8a",
                neutral40: "#94a3b8",
                neutral50: "#94a3b8",
                neutral60: "#94a3b8",
                neutral70: "#94a3b8",
                neutral80: "#e2e8f0", // Màu text trong dropdown
                neutral90: "#e2e8f0",
              },
            })}
          />
        </div>
      </div>

      {/* Số nhà, tên đường */}
      <div className="space-y-2 mt-2">
        <Label className="text-sm font-medium text-white">
          Số nhà, tên đường
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="h-4 w-4 text-blue-400" />
          </div>
          <Input
            placeholder="Nhập số nhà, tên đường"
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            className="bg-[#0f3b87] border-blue-700 text-blue-100 pl-10 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 flex items-center mt-1">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}
