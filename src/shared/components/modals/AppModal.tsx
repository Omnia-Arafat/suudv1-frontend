import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useI18n } from "@/shared/contexts";
import { AnimatePresence } from "framer-motion";

interface BaseModalProps {
  visible: boolean;
  onHide: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

interface SuccessModalProps extends BaseModalProps {
  type: "success";
  icon?: string;
}

interface ErrorModalProps extends BaseModalProps {
  type: "error";
  icon?: string;
}

interface DeleteModalProps extends BaseModalProps {
  type: "delete";
  icon?: string;
}

interface ConfirmModalProps extends BaseModalProps {
  type: "confirm";
  icon?: string;
}

type ModalProps =
  | SuccessModalProps
  | ErrorModalProps
  | DeleteModalProps
  | ConfirmModalProps;

export function AppModal(props: ModalProps) {
  const { language, t } = useI18n();

  const getIcon = () => {
    if (props.icon) return props.icon;

    switch (props.type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "delete":
        return "🗑️";
      case "confirm":
        return "❓";
      default:
        return "ℹ️";
    }
  };

  const getDefaultTexts = () => {
    const defaultTexts = {
      success: {
        confirmText: props.confirmText || t("common.ok"),
        cancelText: props.cancelText || t("common.cancel"),
      },
      error: {
        confirmText: props.confirmText || t("common.ok"),
        cancelText: props.cancelText || t("common.cancel"),
      },
      delete: {
        confirmText: props.confirmText || t("common.delete"),
        cancelText: props.cancelText || t("common.cancel"),
      },
      confirm: {
        confirmText: props.confirmText || t("common.confirm"),
        cancelText: props.cancelText || t("common.cancel"),
      },
    };

    return defaultTexts[props.type] || defaultTexts.success;
  };

  const getFooter = () => {
    const { confirmText, cancelText } = getDefaultTexts();

    return (
      <div className="flex justify-end gap-3 px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 rounded-b-lg">
        {props.type === "delete" || props.type === "confirm" ? (
          <>
            <Button
              label={cancelText}
              icon="pi pi-times"
              onClick={props.onCancel || props.onHide}
              className="px-6 py-2.5 text-gray-600 bg-transparent border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              disabled={props.loading}
            />
            <Button
              label={confirmText}
              icon="pi pi-check"
              onClick={props.onConfirm}
              className={`px-6 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                props.type === "delete"
                  ? "text-white bg-gradient-to-r from-red-600 to-red-700 border-0 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl"
                  : "text-white bg-gradient-to-r from-indigo-600 to-indigo-700 border-0 hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl"
              }`}
              loading={props.loading}
            />
          </>
        ) : (
          <Button
            label={confirmText}
            icon="pi pi-check"
            onClick={props.onConfirm || props.onHide}
            className="px-6 py-2.5 text-white bg-gradient-to-r from-indigo-600 to-indigo-700 border-0 rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            loading={props.loading}
          />
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {props.visible && (
        <Dialog
          header={
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">{getIcon()}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {props.title}
                </h2>
              </div>
            </div>
          }
          visible={props.visible}
          style={{
            width: "500px",
            borderRadius: "16px",
            boxShadow:
              "0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          }}
          footer={getFooter()}
          onHide={props.onHide}
          className="p-fluid"
          contentStyle={{
            padding: "0",
            borderRadius: "0 0 16px 16px",
          }}
          headerStyle={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "none",
            borderRadius: "16px 16px 0 0",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div className="px-6 py-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">{getIcon()}</div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed text-base">
                  {props.message}
                </p>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

// Convenience components for specific modal types
export function SuccessModal(props: Omit<SuccessModalProps, "type">) {
  return <AppModal {...props} type="success" />;
}

export function ErrorModal(props: Omit<ErrorModalProps, "type">) {
  return <AppModal {...props} type="error" />;
}

export function DeleteModal(props: Omit<DeleteModalProps, "type">) {
  return <AppModal {...props} type="delete" />;
}

export function ConfirmModal(props: Omit<ConfirmModalProps, "type">) {
  return <AppModal {...props} type="confirm" />;
}













