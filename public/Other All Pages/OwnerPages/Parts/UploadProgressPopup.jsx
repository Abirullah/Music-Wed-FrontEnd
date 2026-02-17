import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function UploadProgressPopup({ open, progress = 0, message = "Uploading..." }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-2xl transition-all">
                <div className="flex flex-col items-center gap-6">
                  {/* Animated Upload Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20"></div>
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                      <CloudArrowUpIcon className="h-10 w-10 text-white animate-bounce" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                      {message}
                    </Dialog.Title>
                    <p className="text-sm text-gray-600">
                      Please wait while we upload your files to the cloud
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full space-y-2">
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="h-full w-full animate-pulse bg-white/20"></div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {progress}% Complete
                    </p>
                  </div>

                  {/* Loading Dots */}
                  <div className="flex gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-pink-500"></div>
                  </div>

                  {/* Info Text */}
                  <p className="text-xs text-gray-500">
                    This may take a few minutes depending on file size
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
