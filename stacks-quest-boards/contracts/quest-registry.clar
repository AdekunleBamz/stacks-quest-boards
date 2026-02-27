;; title: quest-registry
;; version: 1.0.0
;; summary: Registry for tracking quests and their completion status
;; description: A smart contract for managing quests that users can complete to earn rewards

;; traits
;;

;; token definitions
;;

;; constants
(define-constant ERR-QUEST-NOT-FOUND (err u100))
(define-constant ERR-QUEST-CLOSED (err u101))
(define-constant ERR-ALREADY-COMPLETED (err u102))
(define-constant ERR-INVALID-REWARD (err u103))
(define-constant ERR-UNAUTHORIZED (err u104))

;; data vars
(define-data-var contract-owner principal tx-sender)

;; data maps

;; Quest definition: quest-id -> { name, description, reward, completed-count }
(define-map quests
  { quest-id: uint }
  {
    name: (string-ascii 64),
    description: (string-ascii 256),
    reward: uint,
    max-completions: uint,
    completed-count: uint,
    is-active: bool
  }
)

;; User quest completions: user + quest-id -> completed
(define-map user-completions
  { user: principal, quest-id: uint }
  { completed-at: uint }
)

;; Total quests counter
(define-data-var total-quests uint u0)

;; Quest completion events
(define-map quest-events
  { quest-id: uint, index: uint }
  { user: principal, timestamp: uint }
)

;; Read-only functions

;; Get quest details
(define-read-only (get-quest (quest-id uint))
  (map-get? quests { quest-id: quest-id })
)

;; Check if user completed a quest
(define-read-only (has-completed-quest (user principal) (quest-id uint))
  (is-some (map-get? user-completions { user: user, quest-id: quest-id }))
)

;; Get total number of quests
(define-read-only (get-total-quests)
  (var-get total-quests)
)

;; Get contract owner
(define-read-only (get-contract-owner)
  (ok (var-get contract-owner))
)

;; Public functions

;; Create a new quest
(define-public (create-quest (name (string-ascii 64)) (description (string-ascii 256)) (reward uint) (max-completions uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-UNAUTHORIZED)
    (asserts! (> reward u0) ERR-INVALID-REWARD)
    (asserts! (> max-completions u0) ERR-INVALID-REWARD)
    
    (let ((quest-id (+ (var-get total-quests) u1)))
      (map-set quests 
        { quest-id: quest-id }
        {
          name: name,
          description: description,
          reward: reward,
          max-completions: max-completions,
          completed-count: u0,
          is-active: true
        }
      )
      (var-set total-quests quest-id)
      (ok quest-id)
    )
  )
)

;; Complete a quest
(define-public (complete-quest (quest-id uint))
  (let (
    (quest (unwrap! (map-get? quests { quest-id: quest-id }) ERR-QUEST-NOT-FOUND))
  )
    ;; Verify quest is active
    (asserts! (get is-active quest) ERR-QUEST-CLOSED)
    
    ;; Verify not already completed
    (asserts! (is-none (map-get? user-completions { user: tx-sender, quest-id: quest-id })) ERR-ALREADY-COMPLETED)
    
    ;; Verify max completions not reached
    (asserts! (< (get completed-count quest) (get max-completions quest)) ERR-QUEST-CLOSED)
    
    ;; Record completion
    (map-set user-completions 
      { user: tx-sender, quest-id: quest-id }
      { completed-at: block-height }
    )
    
    ;; Update completion count
    (map-set quests 
      { quest-id: quest-id }
      (merge quest { completed-count: (+ (get completed-count quest) u1) })
    )
    
    (ok true)
  )
)

;; Toggle quest active status
(define-public (toggle-quest-status (quest-id uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-UNAUTHORIZED)
    
    (let ((quest (unwrap! (map-get? quests { quest-id: quest-id }) ERR-QUEST-NOT-FOUND)))
      (map-set quests 
        { quest-id: quest-id }
        (merge quest { is-active: (not (get is-active quest)) })
      )
      (ok true)
    )
  )
)

;; Transfer ownership
(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-UNAUTHORIZED)
    (var-set contract-owner new-owner)
    (ok true)
  )
)
