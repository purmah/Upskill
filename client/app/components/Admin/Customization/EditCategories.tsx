import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout?.categories || []);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories.length > 0 && categories[categories.length - 1].title === "") {
      toast.error("Please fill in the current category before adding a new one");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout?.categories || [], categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  const isUnchanged = areCategoriesUnchanged(data?.layout?.categories || [], categories);
  const hasEmpty = isAnyCategoryTitleEmpty(categories);
  const canSave = !isUnchanged && !hasEmpty;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[24px] font-bold text-gray-900 dark:text-white">
              Course Categories
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage the categories that appear on your courses page.
            </p>
          </div>

          {/* Categories List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden mb-4">
            {categories.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-[16px]">No categories yet.</p>
                <p className="text-sm mt-1">Click the button below to add your first one.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {categories.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 px-5 py-3">
                    <span className="text-gray-300 dark:text-gray-600 text-sm font-mono w-6">
                      {index + 1}
                    </span>
                    <input
                      className="flex-1 bg-transparent text-gray-900 dark:text-white text-[15px] outline-none placeholder-gray-300 dark:placeholder-gray-600"
                      value={item.title}
                      onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
                      placeholder="Category name..."
                    />
                    <button
                      onClick={() =>
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        )
                      }
                      className="text-gray-300 hover:text-red-400 transition p-1 rounded"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Button */}
          <button
            onClick={newCategoriesHandler}
            className="flex items-center gap-2 text-[#0EA5E9] hover:text-[#0284c7] text-sm font-medium transition mb-8"
          >
            <IoMdAddCircleOutline size={20} />
            Add category
          </button>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={canSave ? editCategoriesHandler : undefined}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition ${
                canSave
                  ? "bg-[#0EA5E9] hover:bg-[#0284c7] text-white cursor-pointer"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default EditCategories;