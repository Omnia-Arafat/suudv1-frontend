import React from "react";
import { Button } from "primereact/button";
import { useI18n } from "@/shared/contexts";
import { AnimatePresence, motion } from "framer-motion";

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
  const { t } = useI18n();

  const getIcon = () => {
    switch (props.type) {
      case "success":
        return <i className="pi pi-check-circle text-6xl"></i>;
      case "error":
        return <i className="pi pi-times-circle text-6xl"></i>;
      case "delete":
        return <i className="pi pi-exclamation-triangle text-6xl"></i>;
      case "confirm":
        return <i className="pi pi-question-circle text-6xl"></i>;
      default:
        return <i className="pi pi-info-circle text-6xl"></i>;
    }
  };

  const getIconColor = () => {
    switch (props.type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "delete":
        return "text-red-500";
      case "confirm":
        return "text-blue-500";
      default:
        return "text-gray-500";
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

  const getActionButtons = () => {
    const { confirmText, cancelText } = getDefaultTexts();

    return (
      <div className="flex justify-center gap-4 mt-8">
        {props.type === "delete" || props.type === "confirm" ? (
          <>
            <Button
              label={cancelText}
              onClick={props.onCancel || props.onHide}
              className="px-6 py-3 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 font-medium text-sm"
              disabled={props.loading}
            />
            <Button
              label={confirmText}
              onClick={props.onConfirm}
              className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                props.type === "delete"
                  ? "text-white bg-gradient-to-r from-red-500 to-red-600 border-0 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl hover:scale-105"
                  : "text-white bg-gradient-to-r from-indigo-500 to-indigo-600 border-0 hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105"
              }`}
              loading={props.loading}
            />
          </>
        ) : (
          <Button
            label={confirmText}
            onClick={props.onConfirm || props.onHide}
            className="px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-indigo-600 border-0 rounded-xl hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium text-sm"
            loading={props.loading}
          />
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {props.visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={props.onHide}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Body */}
            <div className="px-8 py-8 text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${getIconColor()}`}
                >
                  {getIcon()}
                </div>
              </div>

              {/* Description */}
              <p
                className={`text-base leading-relaxed mb-8 ${
                  props.type === "error" || props.type === "delete"
                    ? "text-red-700"
                    : "text-gray-700"
                }`}
                style={{ lineHeight: "1.5" }}
              >
                {props.message}
              </p>

              {/* Buttons */}
              {getActionButtons()}
            </div>
          </motion.div>
        </motion.div>
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
