<script lang="ts">
  interface Props {
    name: string
    size?: number
    fill?: 0 | 1
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700
    grade?: -25 | 0 | 200
    class?: string
    style?: string
    title?: string
  }

  let {
    name,
    size = 20,
    fill = 0,
    weight = 400,
    grade = 0,
    class: cls = '',
    style: extraStyle = '',
    title,
  }: Props = $props()
</script>

<span
  class="material-symbols-outlined inline-flex select-none items-center justify-center align-middle {cls}"
  aria-hidden={title ? undefined : 'true'}
  {title}
  style="font-size:{size}px;line-height:1;font-variation-settings:'FILL' {fill}, 'wght' {weight}, 'GRAD' {grade}, 'opsz' {size};{extraStyle}"
>
  {name}
</span>
