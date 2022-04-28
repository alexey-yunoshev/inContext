interface Process {
    env: Record<string, string | undefined>
}

declare var process: Process