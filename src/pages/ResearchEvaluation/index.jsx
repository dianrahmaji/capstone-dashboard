import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import DashboardLayout from "~/layouts/DashboardLayout";
import BaseForm from "~/components/generic/form/BaseForm";
import BaseTextArea from "~/components/generic/form/BaseTextArea";

import { evaluation } from "~/utils/validation";
import BaseButton from "~/components/generic/button/BaseButton";
import { getProfileFromFullName } from "~/utils/text";

export default function ReserachEvaluation() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Evaluasi Project
          </h1>
          <Tabs />
        </div>
      </div>
    </DashboardLayout>
  );
}

function Tabs() {
  return (
    <Tab.Group>
      <Tab.List className="-mb-px mt-2 flex space-x-8 border-b border-gray-200">
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              className={clsx(
                "cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                {
                  "border-accent text-primary": selected,
                  "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700":
                    !selected,
                },
              )}
            >
              Input Evaluasi
            </div>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              className={clsx(
                "cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                {
                  "border-accent text-primary": selected,
                  "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700":
                    !selected,
                },
              )}
            >
              Lihat Evaluasi
            </div>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel>
          <li className="mt-6 text-xl font-semibold text-gray-900">
            Evaluasi Project secara Keseluruhan
          </li>
          <BaseForm
            initialValues={{ evaluation: "" }}
            validation={evaluation}
            handleSubmit={() => {}}
          >
            <BaseTextArea label="" name="evaluation" />
            <div className="mt-5 flex w-full justify-end">
              <BaseButton
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 shadow-sm focus:outline-none sm:col-start-2 sm:text-sm"
              >
                Simpan
              </BaseButton>
            </div>
          </BaseForm>
          <li className="mt-6 text-xl font-semibold text-gray-900">
            Evaluasi Anggota Peneliti
          </li>
          <div className="mt-5 flex items-center gap-4">
            <div className="my-auto  flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <div className=" text-sm text-primary">
                {getProfileFromFullName("Dian Rahmaji")}
              </div>
            </div>
            <span className="font-bold">
              Dian Rahmaji <span className="font-normal">(Anda)</span>
            </span>
          </div>
          <BaseForm
            initialValues={{ evaluation: "" }}
            validation={evaluation}
            handleSubmit={() => {}}
          >
            <BaseTextArea label="" name="evaluation" />
            <div className="mt-5 flex w-full justify-end">
              <BaseButton
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 shadow-sm focus:outline-none sm:col-start-2 sm:text-sm"
              >
                Simpan
              </BaseButton>
            </div>
          </BaseForm>
          <div className="mt-5 flex items-center gap-4">
            <div className="my-auto  flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <div className=" text-sm text-primary">
                {getProfileFromFullName("Dzakiy Harissalam")}
              </div>
            </div>
            <span className="font-bold">Dzakiy Harissalam</span>
          </div>
          <BaseForm
            initialValues={{ evaluation: "" }}
            validation={evaluation}
            handleSubmit={() => {}}
          >
            <BaseTextArea label="" name="evaluation" />
            <div className="mt-5 flex w-full justify-end">
              <BaseButton
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 shadow-sm focus:outline-none sm:col-start-2 sm:text-sm"
              >
                Simpan
              </BaseButton>
            </div>
          </BaseForm>
        </Tab.Panel>
        <Tab.Panel>
          <div className="mt-5 flex items-center gap-4">
            <div className="my-auto  flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <div className=" text-sm text-primary">
                {getProfileFromFullName("Dzakiy Harissalam")}
              </div>
            </div>
            <span className="font-bold">Dzakiy Harissalam</span>
          </div>
          <div className="ml-10">
            <li className="mt-6 text-base font-semibold text-gray-900">
              Evaluasi Project secara Keseluruhan
            </li>
            <p className="mt-2 ml-6">
              Projek penelitian berhasil dilakukan dengan baik, tetapi masih ada
              banyak perbaikan yang dapat dilakukan
            </p>
            <li className="mt-6 text-base font-semibold text-gray-900">
              Evaluasi untuk Anda
            </li>
            <p className="mt-2 ml-6">
              Dian Rahmaji dapat mengerjakan pembagian proyek penelitian dengan
              baik
            </p>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <div className="my-auto  flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <div className=" text-sm text-primary">
                {getProfileFromFullName("Dian Rahmaji")}
              </div>
            </div>
            <span className="font-bold">
              Dian Rahmaji <span className="font-normal">(Anda)</span>
            </span>
          </div>
          <div className="ml-10">
            <li className="mt-6 text-base font-semibold text-gray-900">
              Evaluasi Project secara Keseluruhan
            </li>
            <p className="mt-2 ml-6">
              Projek penelitian berhasil dilakukan dengan baik, tetapi masih ada
              banyak perbaikan yang dapat dilakukan
            </p>
            <li className="mt-6 text-base font-semibold text-gray-900">
              Evaluasi untuk Anda
            </li>
            <p className="mt-2 ml-6">
              Berhasil menyelesaikan proyek tetapi masih ada perbaikan yang
              harus dilakukan
            </p>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
