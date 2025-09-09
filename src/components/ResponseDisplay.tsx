'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';

interface Citation {
  doc_id: string;
  span: string;
}

interface ResponseData {
  answer?: string;
  citations?: Citation[];
  confidence?: number;
  latency_ms?: number;
  trace_id?: string;
  error?: string;
}

interface ResponseDisplayProps {
  response: ResponseData | null;
  isLoading: boolean;
  className?: string;
}

export default function ResponseDisplay({ response, isLoading, className = '' }: ResponseDisplayProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`poker-card ${className}`}
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-poker-500/30 border-t-poker-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-card-300 text-lg">Dealing the cards...</p>
            <p className="text-card-400 text-sm">Analyzing your poker question</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!response) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`poker-card ${className}`}
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-card-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🃏</span>
          </div>
          <p className="text-card-300 text-lg">Ready to answer your poker questions</p>
          <p className="text-card-400 text-sm">Ask anything about poker rules, strategies, or terminology</p>
        </div>
      </motion.div>
    );
  }

  if (response.error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`poker-card border-red-500/50 ${className}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-semibold text-red-400">Error</h3>
        </div>
        <p className="text-card-300">{response.error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`poker-card ${className}`}
    >
      {/* Answer */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-card-100">Answer</h3>
        </div>
        <div className="bg-card-900/50 rounded-lg p-4 border border-poker-500/20">
          <p className="text-card-100 leading-relaxed">{response.answer}</p>
        </div>
      </div>

      {/* Citations */}
      {response.citations && response.citations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-card-200 mb-3 flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Sources
          </h4>
          <div className="space-y-2">
            {response.citations.map((citation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card-800/30 rounded-lg p-3 border border-poker-500/10 hover:border-poker-500/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-poker-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-card-300 text-sm font-mono">
                    {citation.doc_id}
                  </span>
                </div>
                <p className="text-card-400 text-sm mt-1 ml-6">
                  {citation.span}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 text-sm text-card-400">
        {response.confidence !== undefined && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-poker-500 rounded-full" />
            <span>Confidence: {(response.confidence * 100).toFixed(1)}%</span>
          </div>
        )}
        {response.latency_ms && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{response.latency_ms}ms</span>
          </div>
        )}
        {response.trace_id && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs">{response.trace_id}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
