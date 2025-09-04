import { CourseFollow } from "@/components/module/Home/CourseFollow";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-3xl border h-80 flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/536270153_122127714320930804_5815017533085829601_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE_8WC6Tp6ldDcM9HOJX6JzWS7TZR0EAExZLtNlHQQATNv3c21zZVlmmlgEILMNA_VwZY9SfOTdmegnpyhYKhCc&_nc_ohc=fjXXhG3-rNMQ7kNvwEMvR2T&_nc_oc=Admc3gmhdvSAhYl8WYKJZGPeZQgZULz2Lpzi3obqhmhtx_m-pIv-XaKOfXwz2Vj2I0A&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=irClbSWM7R6GhB76rQuYLQ&oh=00_AfbG4SbYbXR-9WsuXLEZlZhz1U2rb4jk-kbRurxi2ZOhcw&oe=68BF5AAA"
          alt="VIỆT NAM"
        />
        <img
          className="w-full h-full object-cover"
          src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/536282910_122127714200930804_7348895973571296696_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHyA6SP4jQQQAZOBckh52WV2XuoVxjxfaLZe6hXGPF9ondowK29ewSS6wKd5h66Usd4NlQPaKvt7ax9L1yqF2M1&_nc_ohc=u8iGuIZlOg0Q7kNvwHihNzq&_nc_oc=AdlBTjoiAEwOPogiuhSgmjEETHnEfouW39RN2Y1hPNL0takZJD3n4TYxDj38V20WupM&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=EUdWqQIOXTKxKE4aobVAOA&oh=00_AfaaFDKA0eUtpceNn5r8-uF_8LVI8LG-qPTAnzT2zZFQog&oe=68BF6FAB"
          alt="VIỆT NAM"
        />
        <img
          className="w-full h-full object-cover"
          src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/539734280_122127714062930804_591350267221268761_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEHpbZaKxTFpYlwD9Qin8b39Jw_vtB8d0j0nD--0Hx3SMFf7U8G7sdJ3QwKtSX1pEvYUeyBQeOSlZMzdWrvKCqb&_nc_ohc=obyxRzkXUaUQ7kNvwE5-mrm&_nc_oc=AdlBbBqOTIT0z_G8GQlm-orc72w221UeogNSn2ivObBoIz3uHQK3FwhpWE58Jd4DKfA&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=foNKIau4BuTBVvrKmE_qDg&oh=00_Afb3ySja9j7ejuDdZnevN5f7cXRcdKG2xg79nBElj93w0A&oe=68BF6938"
          alt="VIỆT NAM"
        />
      </div>

      <div>
        <hr className="my-8 w-full border-t" />
        <div className="p-10">
          <CourseFollow />
        </div>
      </div>
    </div>
  );
}
