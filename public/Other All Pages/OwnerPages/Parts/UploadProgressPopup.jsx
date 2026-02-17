import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function UploadProgressPopup({
  open,
  progress = 0,
  message = "Uploading...",
  onCancel,
  isCancelling = false,
}) {
  const canCancel = typeof onCancel === "function" && progress < 100 && !isCancelling;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          if (canCancel) onCancel();
        }}
      >
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl border-2 border-black bg-white p-8 text-center shadow-2xl transition-all">
                <div className="flex flex-col items-center gap-5">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-yellow-300 opacity-40" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-yellow-400 shadow-md">
                      <CloudArrowUpIcon className="h-10 w-10 animate-bounce text-black" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Dialog.Title className="text-2xl font-bold text-black">
                      {message}
                    </Dialog.Title>
                    <p className="text-sm text-gray-600">
                      Please wait while we upload your files to the cloud
                    </p>
                  </div>

                  <div className="w-full space-y-2">
                    <div className="h-3 w-full overflow-hidden rounded-full border border-black/20 bg-yellow-100">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="h-full w-full animate-pulse bg-yellow-300/20" />
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-black">
                      {progress}% Complete
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-black [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-yellow-500 [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-black" />
                  </div>

                  <p className="text-xs text-gray-500">
                    This may take a few minutes depending on file size
                  </p>

                  {onCancel ? (
                    <button
                      type="button"
                      onClick={onCancel}
                      disabled={!canCancel}
                      className={`mt-2 w-full rounded-xl border-2 px-4 py-2 text-sm font-semibold transition ${
                        canCancel
                          ? "border-black bg-yellow-400 text-black hover:bg-yellow-300"
                          : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Upload"}
                    </button>
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
