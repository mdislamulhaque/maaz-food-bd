import React from 'react'
import Section from './shared/Section';
import { useApp } from '../context/AppContext';

export default function Track() {
  const { t, orderId, setOrderId, handleTrack, trackResult } = useApp();
  return (
    <>
      {(
        <main>
          <Section
            title={t("অর্ডার ট্র্যাকিং", "Order tracking")}
            subtitle={`${t("অবস্থা", "Status")}: ${t(
              "Processing/Dispatched/Delivered (ডেমো)",
              "Processing/Dispatched/Delivered (demo)"
            )}`}
          >
            <div className="bg-white rounded-2xl ring-1 ring-neutral-200 p-5 max-w-xl">
              <label className="text-sm">
                {t("অর্ডার আইডি", "Order ID")}
                <input
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.trim())}
                  className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2"
                  placeholder="SF-XXXXXXXX"
                />
              </label>
              <button
                onClick={handleTrack}
                className="mt-3 rounded-xl bg-neutral-900 text-white px-5 py-3 hover:bg-neutral-800"
              >
                {t("স্ট্যাটাস দেখুন", "Check status")}
              </button>
              {trackResult && (
                <div className="mt-5 rounded-xl ring-1 ring-neutral-200 p-4 bg-neutral-50">
                  <div className="text-sm">
                    <span className="text-neutral-500">ID:</span>{" "}
                    {trackResult.id}
                  </div>
                  <div className="text-sm">
                    <span className="text-neutral-500">
                      {t("স্ট্যাটাস", "Status")}:
                    </span>{" "}
                    {t(trackResult.status, trackResult.status)}
                  </div>
                  <div className="text-sm">
                    <span className="text-neutral-500">ETA:</span>{" "}
                    {trackResult.eta}
                  </div>
                </div>
              )}
            </div>
          </Section>
        </main>
      )}
    </>
  );
}
